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
    _mechanics: List<Employee>,
    val mechanics: List<RestMechanic> = _mechanics.map { RestMechanic(it) },
    val unassignedServiceRequests: List<RestServiceRequest> =
        serviceRequests.filter { it.assignedWorker == null }
        .map { RestServiceRequest(it) },
    val activeServiceRequests: List<RestServiceRequest> =
        serviceRequests.map { RestServiceRequest(it) }
)

class RestMechanic(
    mechanic: Employee,
    val id: Long = mechanic.id,
    val name: String = mechanic.name,
    val specializes: List<String> = mechanic.specializes,
)

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

        val repositories = serviceRequestRepository.findAll().toList()
        val mechanics = employeeRepository.findAllByAuthority(EmployeeAuthority.MECHANIC)

        return RestMessage("Ok", ManagerDashboard(repositories, mechanics))
    }

    @PostMapping("/assign-worker")
    fun assignWorker(@RequestBody assignWorkerRequest: AssignWorkerRequest): RestMessage<Unit> {
        val employee = employeeRepository.findById(assignWorkerRequest.workerId)
        if (employee.isEmpty()) return RestMessage("Błąd: pracownik nie istnieje")
        val emp = employee.get()

        val serviceRequest = serviceRequestRepository.findById(assignWorkerRequest.serviceRequestId)
        if (serviceRequest.isEmpty()) return RestMessage("Błąd: usługa nie istnieje")

        val req = serviceRequest.get()
        req.assignedWorker = emp
        serviceRequestRepository.save(req)

        return RestMessage("Ok")
    }
}