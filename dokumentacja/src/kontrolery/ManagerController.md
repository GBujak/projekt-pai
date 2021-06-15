# ManagerController.kt

Kontroler zawiera funkcje ładowania danych do strony startowej kierownika oraz
przypisywania pracownika od usługi. Przypisywanie mechanika do usługi jest dość
skomplikowane, ale większość tej logiki znajduje się w kliencie. Uznaliśmy, że
niepotrzebne jest sprawdzanie na serwerze, czy kompetencje mechanika zawierają
wszystkie tagi opisujące usługę. Jest to sprawdzane na kliencie.

## Klasy pomocnicze

```kotlin
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
```

## Klasa kontrolera

- `ManagerController.getDashboard` - dane do strony startowej kierownika.
- `ManagerController.assignWorker` - przypisanie pracownika do usługi.

```kotlin
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
        val mechanics = employeeRepository.findAllByAuthority(EmployeeAuthority.MECHANIC)

        return RestMessage("Ok", ManagerDashboard(repositories, mechanics))
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
```
