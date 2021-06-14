package warsztat.warsztatserver.controllers

import org.hibernate.Hibernate
import org.springframework.web.bind.annotation.*
import warsztat.warsztatserver.models.servicestorymodels.ServiceComment
import warsztat.warsztatserver.models.servicestorymodels.ServiceRequest
import warsztat.warsztatserver.models.servicestorymodels.WorkDescription
import warsztat.warsztatserver.models.servicestorymodels.WorkDescriptionPartUsage
import warsztat.warsztatserver.models.users.Employee
import warsztat.warsztatserver.models.util.CurrentUserUtil
import warsztat.warsztatserver.models.util.RestMessage
import warsztat.warsztatserver.repositories.*
import java.util.*

data class CreateServiceRequest(val title: String, val description: String, val carId: Long)

data class NewUsedPart (
    val id: Long,
    val ammount: Int,
)

data class NewWorkDescription (
    val name: String,
    val hours: Int,
    val usedParts: List<NewUsedPart>,
)

data class CreateCommentRequest(
    val serviceId: Long,
    val title: String,
    val content: String,
    val finishesService: Boolean,

    val workDescriptions: List<NewWorkDescription>,
)

data class ChangeTagsRequest (
    val serviceId: Long,
    val newTags: List<String>,
)

class ServiceStoryRest(
    serviceRequest: ServiceRequest,
    val hasInvoice: Boolean,
    val id: Long = serviceRequest.id,
    val title: String = serviceRequest.title,
    val carModelId: Long = serviceRequest.car.model.id,
    val finished: Boolean = serviceRequest.finished,
    val description: String = serviceRequest.description,
    val tags: List<String> = serviceRequest.tags,
    val date: Date = serviceRequest.submittedOn,
    val submitter: String = serviceRequest.submitter.username,
    val comments: List<ServiceCommentRest> = serviceRequest.serviceComments.map { ServiceCommentRest(it) },
)

class ServiceCommentRest(
    serviceComment: ServiceComment,
    val title: String = serviceComment.title,
    val content: String = serviceComment.content,

    val submitter: String = if (Hibernate.unproxy(serviceComment.submitter) is Employee)
        (Hibernate.unproxy(serviceComment.submitter) as Employee).name
        else serviceComment.submitter.username,

    val accountType: String = if (Hibernate.unproxy(serviceComment.submitter) is Employee)
        (Hibernate.unproxy(serviceComment.submitter) as Employee).authority.name.toLowerCase()
        else "customer",

    val submittedOn: Date = serviceComment.submittedOn,

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
    val carPartRepository: CarPartRepository,
    val carRepository: CarRepository,
    val currentUserUtil: CurrentUserUtil,
    val serviceInvoiceRepository: ServiceInvoiceRepository,
) {
    @PostMapping("/create")
    fun create(@RequestBody request: CreateServiceRequest): RestMessage<Long> {
        val (title, desc, carId) = request
        val car = carRepository.findById(carId)
        if (car.isEmpty) return RestMessage("Błąd: nie ma takiego samochodu")
        val submitter = currentUserUtil.getCurrentUser()
        val result = serviceRequestRepository.save(ServiceRequest(title, desc, submitter, car.get()))
        return RestMessage("Ok", result.id)
    }

    @PostMapping("/create-comment")
    fun comment(@RequestBody request: CreateCommentRequest): RestMessage<Unit> {
        val submitter = currentUserUtil.getCurrentUser()
        val serviceOpt = serviceRequestRepository.findById(request.serviceId)
        if (serviceOpt.isEmpty) {
            return RestMessage("Nie znaleziono takiego id")
        }

        val service = serviceOpt.get()

        if (request.workDescriptions.isNotEmpty()) {
            if (submitter !is Employee) {
                return RestMessage("Błąd: tylko pracownicy mogą dodawać opisy pracy")
            }
            if (service.finished) {
                return RestMessage("Błąd: dodawanie pracy do zakończonej usługi")
            }
        }

        val comment = ServiceComment(
            title = request.title,
            content = request.content,
            serviceRequest = service,
            submitter = submitter,
        )

        for (desc in request.workDescriptions) {
            val newDesc = WorkDescription(desc.name, desc.hours, mutableListOf(), comment)
            for (usedPart in desc.usedParts) {
                val partOpt = carPartRepository.findById(usedPart.id)
                if (partOpt.isEmpty) return RestMessage("Błąd: część o takim id nie istnieje")
                val part = partOpt.get()
                newDesc.partUsages.add(WorkDescriptionPartUsage(newDesc, part, usedPart.ammount))
            }
            comment.workDescriptions.add(newDesc)
        }

        serviceCommentRepository.save(comment)

        if (request.finishesService) {
            service.finished = true
            serviceRequestRepository.save(service)
        }

        return RestMessage("Ok")
    }

    @GetMapping("/all/{id}")
    fun storyAll(@PathVariable("id") id: Long): RestMessage<ServiceStoryRest> {
        val serviceRequest = serviceRequestRepository.findById(id)
        if (serviceRequest.isEmpty) {
            return RestMessage("Nie znaleziono takiego id")
        }
        return RestMessage("Ok", ServiceStoryRest(
            serviceRequest.get(),
            serviceInvoiceRepository.findByService(serviceRequest.get()) != null
        ))
    }

    @PostMapping("change-tags")
    fun changeTags(@RequestBody changeTagsRequest: ChangeTagsRequest): RestMessage<Unit> {
        val user = currentUserUtil.getCurrentUserIfVariant<Employee>()

        if (user == null) {
            return RestMessage("Błąd: nie masz uprawnień")
        }

        val serviceOpt = serviceRequestRepository.findById(changeTagsRequest.serviceId)
        if (serviceOpt == null) {
            return RestMessage("Błąd: nie ma usługi o takim id")
        }
        val service = serviceOpt.get()

        service.tags = changeTagsRequest.newTags
        serviceRequestRepository.save(service)

        return RestMessage("Ok")
    }
}