# MechanicController

Kontroler mechanika odpowiada za dwie funkcje. Pierwsza to (tak jak inne kontrolery
użytkowników) zwracanie informacji do strony głównej. Druga opcja to zmiana
specjalizacji. Decydują one o tym, jakiego pracownika wybierze kierownik do
realizacji danej usługi.

## Klasy pomocnicze

```kotlin
data class MechanicDashboard(
    val unassigned: List<RestServiceRequest>,
    val assigned: List<RestServiceRequest>,
    val specializations: List<String>,
)

data class ChangeSpecializationsRequest(
    val newSpecializations: List<String>,
)
```

## Klasa kontrolera

- `MechanicController.getDashBoard` - informacje do strony głównej
- `MechanicController.changeSpecializations` - zmiana specjalizacji

```kotlin
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
```
