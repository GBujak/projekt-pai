package warsztat.warsztatserver.controllers

import org.springframework.web.bind.annotation.*
import warsztat.warsztatserver.klient.Customer
import warsztat.warsztatserver.models.carmodels.Car
import warsztat.warsztatserver.models.carmodels.CarMake
import warsztat.warsztatserver.models.carmodels.CarModel
import warsztat.warsztatserver.models.servicestorymodels.ServiceRequest
import warsztat.warsztatserver.models.util.Address
import warsztat.warsztatserver.models.util.CurrentUserUtil
import warsztat.warsztatserver.models.util.RestMessage
import warsztat.warsztatserver.repositories.*
import java.util.*

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