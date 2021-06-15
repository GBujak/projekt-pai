# CustomerController.kt

Kontroler klienta zawiera implementacje czynności, jakie może wykonać klient w
systemie. 

## Klasy pomocnicze

```kotlin
class RegisterRequest(
    val username: String,
    val password: String,
    val name: String,
    val phoneNumber: String,
    val address: Address,
) {
    fun toCustomer() = Customer(username, password, name, phoneNumber, address)
}

class AddCarRequest(
    val productionYear: Int,
    val mileage: Int,
    val modelId: Long,
    val makeId: Long,
)

class CustomerDashboard(
    inputServices: List<ServiceRequest>,
    inputCars: List<Car>,
    val services: List<RestServiceRequest> = inputServices.map { RestServiceRequest(it) },
    val finishedServices: List<RestServiceRequest> = inputServices
        .filter { it.finished }.map { RestServiceRequest(it) },
    val cars: List<CarRest> = inputCars.map { CarRest(it) },
)
```

## Klasa kontrolera

- `CustomerController.register` - implementacja rejestracji konta klienta.
- `CustomerController.addCar` - dodawanie nowego samochodu przypisanego do konta
  klienta. Klient może tworzyć nową usługę dotyczącą jednego z samochodów
  przypisanego do konta.
- `CustomerController.getDashboard` - pobieranie informacji do strony głównej
  klienta. Dzięki temu rozwiązaniu, przeglądarka wykonuje mniej zapytań HTTP przy
  ładowaniu strony.

```kotlin
@RestController
@RequestMapping("/api/customer")
class CustomerController(
    val customerRepository: CustomerRepository,
    val applicationUserRepository: ApplicationUserRepository,
    val carModelRepository: CarModelRepository,
    val carMakeRepository: CarMakeRepository,
    val carRepository: CarRepository,
    val currentUserUtil: CurrentUserUtil,
) {
    @PostMapping("/register")
    fun register(@RequestBody registerRequest: RegisterRequest) : RestMessage<Unit> {
        if (applicationUserRepository.findByUsername(registerRequest.username) != null) {
            return RestMessage("Błąd: nazwa użytkownika już istnieje")
        }
        val customer = customerRepository.save(registerRequest.toCustomer())
        return RestMessage("Ok")
    }

    @PostMapping("/add-car")
    fun addCar(@RequestBody addCarRequest: AddCarRequest): RestMessage<Long> {
        val makeOpt = carMakeRepository.findById(addCarRequest.makeId)
        if (makeOpt.isEmpty) {
            return RestMessage("Błąd: marka o takim id nie istnieje")
        }
        val make = makeOpt.get()

        val modelOpt = carModelRepository.findById(addCarRequest.modelId)
        if (modelOpt.isEmpty) {
            return RestMessage("Błąd: nie ma modelu o takim id")
        }
        val model = modelOpt.get()
        if (make.carModels.filter { it.id == model.id }.size != 1) {
            return RestMessage("Błąd: podany model nie należy do podanej marki")
        }

        val user = currentUserUtil.getCurrentUserIfVariant<Customer>()
        if (user == null) return RestMessage("Błąd: konto nie jest kontem klienta")


        val car = carRepository.save(addCarRequest.let {
            Car(it.productionYear, it.mileage, model, user)
        })

        return RestMessage("Ok", car.id)
    }

    @GetMapping("/dashboard")
    fun getDashboard(): RestMessage<CustomerDashboard> {
        val user = currentUserUtil.getCurrentUserIfVariant<Customer>()
        return if (user == null) RestMessage("Błąd: nie jesteś klientem")
        else RestMessage("Ok", CustomerDashboard(user.serviceRequests, user.cars))
    }
}
```
