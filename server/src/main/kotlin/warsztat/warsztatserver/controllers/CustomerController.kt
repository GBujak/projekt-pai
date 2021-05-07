package warsztat.warsztatserver.controllers

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*
import warsztat.warsztatserver.klient.Customer
import warsztat.warsztatserver.models.carmodels.Car
import warsztat.warsztatserver.models.carmodels.CarMake
import warsztat.warsztatserver.models.carmodels.CarModel
import warsztat.warsztatserver.models.servicestorymodels.ServiceRequest
import warsztat.warsztatserver.models.util.Address
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
    val modelName: String,
    val makeName: String,
    val modelVariant: String,
)

class CustomerDashboard(
    inputServices: List<ServiceRequest>,
    inputCars: List<Car>,
    val services: List<ServiceRest> = inputServices.map { ServiceRest(it) },
    val cars: List<CarRest> = inputCars.map { CarRest(it) },
)

class ServiceRest(
    serviceRequest: ServiceRequest,
    val lastUpdate: Date = serviceRequest.serviceComments.last().submittedOn,
    val car: CarRest = CarRest(serviceRequest.car),
)

class CarRest(
    car: Car,
    val carName: String = "${car.model.carMake.makeName} ${car.model.modelName}",
    val mileage: Int = car.lastMileage,
)

@RestController
@RequestMapping("/api/klient")
class CustomerController(
    val customerRepository: CustomerRepository,
    val applicationUserRepository: ApplicationUserRepository,
    val carModelRepository: CarModelRepository,
    val carMakeRepository: CarMakeRepository,
    val carRepository: CarRepository,
) {
    @PostMapping("/rejestracja")
    fun register(@RequestBody registerRequest: RegisterRequest) : RestMessage<Unit> {
        if (applicationUserRepository.findByUsername(registerRequest.username) != null) {
            return RestMessage("Błąd: nazwa użytkownika już istnieje")
        }
        val customer = customerRepository.save(registerRequest.toCustomer())
        return RestMessage("Ok")
    }

    @PostMapping("/dodaj-samochod")
    fun addCar(@RequestBody addCarRequest: AddCarRequest): RestMessage<Unit> {
        var make = carMakeRepository.findByMakeName(addCarRequest.makeName)
        var model = carModelRepository.findByModelName(addCarRequest.modelName)
        if (make == null) {
            make = carMakeRepository.save(CarMake(addCarRequest.makeName, setOf()))
        }
        if (model == null) {
            model = carModelRepository.save(CarModel(
                addCarRequest.modelName,
                addCarRequest.modelVariant,
                make
            ))
        }
        val user = SecurityContextHolder.getContext().authentication.principal as Customer

        val car = carRepository.save(addCarRequest.let {
            Car(it.productionYear, it.mileage, model, user)
        })

        return RestMessage("Ok")
    }

    @GetMapping("/dashboard")
    fun getDashboard(): RestMessage<CustomerDashboard> {
        // TODO: principal to powinno być id, bo jak jest ApplicationUser to nie działa hibernate
        val user = customerRepository.findById((SecurityContextHolder.getContext().authentication.principal as Customer).id).get()
        if (user == null) return RestMessage("Błąd: nie jesteś klientem")
        return RestMessage(
            "Ok", CustomerDashboard(user.serviceRequests, user.cars)
        )
    }
}