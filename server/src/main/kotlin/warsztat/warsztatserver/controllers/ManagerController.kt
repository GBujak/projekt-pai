package warsztat.warsztatserver.controllers

import org.springframework.web.bind.annotation.*
import warsztat.warsztatserver.models.servicestorymodels.ServiceRequest
import warsztat.warsztatserver.models.users.Employee
import warsztat.warsztatserver.models.users.EmployeeAuthority
import warsztat.warsztatserver.models.util.CurrentUserUtil
import warsztat.warsztatserver.models.util.RestMessage
import warsztat.warsztatserver.repositories.EmployeeRepository
import warsztat.warsztatserver.repositories.ServiceRequestRepository
import java.util.*

class ManagerDashboard (
    serviceRequests: List<ServiceRequest>,
    val unassignedServiceRequests: List<RestUnassignedServiceRequest> =
        serviceRequests.filter { it.assignedWorker == null }
        .map { RestUnassignedServiceRequest(it) },
    val activeServiceRequests: List<RestServiceRequest> =
        serviceRequests.map { RestServiceRequest(it) }
)

open class RestServiceRequest (
    serviceRequest: ServiceRequest,
    val carModel: String = serviceRequest.car.model.modelName,
    val carMake: String = serviceRequest.car.model.carMake.makeName,
    val date: Date = serviceRequest.submittedOn,
)

class RestUnassignedServiceRequest (
    serviceRequest: ServiceRequest,
    val tags: List<String> = serviceRequest.tags,
): RestServiceRequest(serviceRequest)

class AssignWorkerRequest (
    val serviceRequestId: Long,
    val workerId: Long,
)

@RestController
@RequestMapping("/api/manager")
class ManagerController(
    val currentUserUtil: CurrentUserUtil,
    val serviceRequestRepository: ServiceRequestRepository,
    val employeeRepository: EmployeeRepository,
) {
    @GetMapping("/dashboard")
    fun getDashboard(): RestMessage<ManagerDashboard> {
        val user = currentUserUtil.getCurrentUserIfVariant<Employee>()
        if (user == null ||
            !listOf(EmployeeAuthority.MANAGER, EmployeeAuthority.ADMIN).contains(user.authority))
                    return RestMessage("Błąd: nie jesteś kierownikiem albo administratorem")

        val repositories = serviceRequestRepository.findAll().toList()
        return RestMessage("Ok", ManagerDashboard(repositories))
    }

    @PostMapping("/assign-worker")
    fun assignWorker(@RequestBody assignWorkerRequest: AssignWorkerRequest): RestMessage<Unit> {
        val employee = employeeRepository.findById(assignWorkerRequest.workerId)
        if (employee.isEmpty()) return RestMessage("Błąd: pracownik nie istnieje")

        val serviceRequest = serviceRequestRepository.findById(assignWorkerRequest.serviceRequestId)
        if (serviceRequest.isEmpty()) return RestMessage("Błąd: usługa nie istnieje")

        val req = serviceRequest.get()
        req.assignedWorker = employee.get()
        serviceRequestRepository.save(req)

        return RestMessage("Ok")
    }
}