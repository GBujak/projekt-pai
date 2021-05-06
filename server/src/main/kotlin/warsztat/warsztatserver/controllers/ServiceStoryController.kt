package warsztat.warsztatserver.controllers

import org.springframework.http.HttpStatus
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import warsztat.warsztatserver.models.ApplicationUser
import warsztat.warsztatserver.models.servicestorymodels.ServiceComment
import warsztat.warsztatserver.models.servicestorymodels.ServiceRequest
import warsztat.warsztatserver.repositories.ServiceCommentRepository
import warsztat.warsztatserver.repositories.ServiceRequestRepository
import javax.websocket.server.PathParam

class RestMessage<T>(
    val msg: String,
    val data: T? = null,
)

data class CreateServiceRequest(val title: String, val description: String)
data class CreateCommentRequest(val requestId: Long, val title: String, val content: String)

@RestController
@RequestMapping("/api/service-story")
class ServiceStoryController(
    val serviceRequestRepository: ServiceRequestRepository,
    val serviceCommentRepository: ServiceCommentRepository,
) {
    @PostMapping("/create")
    fun create(@RequestBody request: CreateServiceRequest): RestMessage<ServiceRequest> {
        val (title, desc) = request
        val submitter = SecurityContextHolder.getContext().authentication.principal as ApplicationUser
        val result = serviceRequestRepository.save(ServiceRequest(title, desc, submitter))
        return RestMessage("Ok", result)
    }

    @PostMapping("/create-comment")
    fun comment(@RequestBody request: CreateCommentRequest): RestMessage<ServiceComment> {
        val submitter = SecurityContextHolder.getContext().authentication.principal as ApplicationUser
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

    @GetMapping("/story-all/{id}")
    fun storyAll(@PathVariable("id") id: Long): RestMessage<String> {
        val serviceRequest = serviceRequestRepository.findById(id)
        if (serviceRequest.isEmpty) {
            return RestMessage("Nie znaleziono takiego id")
        }
        return RestMessage("Ok", serviceRequest.get().submitter.username)
    }
}