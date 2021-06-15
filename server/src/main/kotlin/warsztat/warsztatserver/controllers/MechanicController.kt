package warsztat.warsztatserver.controllers

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import warsztat.warsztatserver.models.users.Employee
import warsztat.warsztatserver.models.util.CurrentUserUtil
import warsztat.warsztatserver.models.util.RestMessage
import warsztat.warsztatserver.repositories.EmployeeRepository
import warsztat.warsztatserver.repositories.ServiceRequestRepository

data class MechanicDashboard(
    val unassigned: List<RestServiceRequest>,
    val assigned: List<RestServiceRequest>,
    val specializations: List<String>,
)

data class ChangeSpecializationsRequest(
    val newSpecializations: List<String>,
)

@RestController
@RequestMapping("/api/mechanic")
class MechanicController(
    val serviceRequestRepository: ServiceRequestRepository,
    val currentUserUtil: CurrentUserUtil,
    val employeeRepository: EmployeeRepository,
) {
    @PostMapping("dashboard")
    fun getDashBoard(): RestMessage<MechanicDashboard> {
        val serviceRequests = serviceRequestRepository.findAll()
        val currentUser = currentUserUtil.getCurrentUserIfVariant<Employee>()!!

        val dashboard = MechanicDashboard(
            unassigned = serviceRequests
                .filter { it.assignedWorker == null }
                .map { RestServiceRequest(it) },
            assigned = serviceRequests
                .filter { it.assignedWorker != null && it.assignedWorker!!.id == currentUser.id }
                .map { RestServiceRequest(it) },
            specializations = currentUser.specializes,
        )

        return RestMessage("Ok", dashboard)
    }

    @PostMapping("change-specializations")
    fun changeSpecializations(@RequestBody req: ChangeSpecializationsRequest): RestMessage<Unit> {
        val curUser = currentUserUtil.getCurrentUserIfVariant<Employee>()!!
        val userOpt = employeeRepository.findById(curUser.id)
        val user = userOpt.get()
        user.specializes = req.newSpecializations
        employeeRepository.save(user)
        return RestMessage("Ok")
    }
}