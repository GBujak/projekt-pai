package warsztat.warsztatserver.controllers

import org.springframework.web.bind.annotation.*
import warsztat.warsztatserver.models.servicestorymodels.ServiceComment
import warsztat.warsztatserver.models.servicestorymodels.ServiceRequest
import warsztat.warsztatserver.models.servicestorymodels.WorkDescription
import warsztat.warsztatserver.models.servicestorymodels.WorkDescriptionPartUsage
import warsztat.warsztatserver.models.util.CurrentUserUtil
import warsztat.warsztatserver.models.util.RestMessage
import warsztat.warsztatserver.repositories.CarRepository
import warsztat.warsztatserver.repositories.ServiceCommentRepository
import warsztat.warsztatserver.repositories.ServiceRequestRepository
import java.util.*

data class CreateServiceRequest(val title: String, val description: String, val carId: Long)
data class CreateCommentRequest(val requestId: Long, val title: String, val content: String)

class ServiceStoryRest(
    serviceRequest: ServiceRequest,
    val title: String = serviceRequest.title,
    val finished: Boolean = serviceRequest.finished,
    val description: String = serviceRequest.description,
    val date: Date = serviceRequest.submittedOn,
    val submitter: String = serviceRequest.submitter.username,
    val comments: List<ServiceCommentRest> = serviceRequest.serviceComments.map { ServiceCommentRest(it) },
)

class ServiceCommentRest(
    serviceComment: ServiceComment,
    val title: String = serviceComment.title,
    val content: String = serviceComment.content,
    val workDescriptions: List<WorkDescriptionRest> =
        serviceComment.workDescriptions.map { WorkDescriptionRest(it) }
)

class WorkDescriptionRest(
    workDescription: WorkDescription,
    val name: String = workDescription.workName,
    val hours: Int = workDescription.workHours,
    val usedParts: List<UsedPartRest> = workDescription.partUsages.map { UsedPartRest(it) }
)

class UsedPartRest(
    usage: WorkDescriptionPartUsage,
    val name: String = usage.carPart.name,
    val price: Long = usage.carPart.price,
    val ammount: Int = usage.ammount,
)

@RestController
@RequestMapping("/api/service-story")
class ServiceStoryController(
    val serviceRequestRepository: ServiceRequestRepository,
    val serviceCommentRepository: ServiceCommentRepository,
    val carRepository: CarRepository,
    val currentUserUtil: CurrentUserUtil,
) {
    @PostMapping("/create")
    fun create(@RequestBody request: CreateServiceRequest): RestMessage<ServiceRequest> {
        val (title, desc, carId) = request
        val car = carRepository.findById(carId)
        if (car.isEmpty) return RestMessage("Błąd: nie ma takiego samochodu")
        val submitter = currentUserUtil.getCurrentUser()
        val result = serviceRequestRepository.save(ServiceRequest(title, desc, submitter, car.get()))
        return RestMessage("Ok", result)
    }

    @PostMapping("/create-comment")
    fun comment(@RequestBody request: CreateCommentRequest): RestMessage<ServiceComment> {
        val submitter = currentUserUtil.getCurrentUser()
        val serviceRequestOptional = serviceRequestRepository.findById(request.requestId)
        if (serviceRequestOptional.isEmpty) {
            return RestMessage("Nie znaleziono takiego id")
        }

        val comment = ServiceComment(
            title = request.title,
            content = request.content,
            serviceRequest = serviceRequestOptional.get(),
            submitter = submitter,
        )

        val result = serviceCommentRepository.save(comment)
        return RestMessage("Ok", result)
    }

    @GetMapping("/all/{id}")
    fun storyAll(@PathVariable("id") id: Long): RestMessage<ServiceStoryRest> {
        val serviceRequest = serviceRequestRepository.findById(id)
        if (serviceRequest.isEmpty) {
            return RestMessage("Nie znaleziono takiego id")
        }
        return RestMessage("Ok", ServiceStoryRest(serviceRequest.get()))
    }
}