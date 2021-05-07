package warsztat.warsztatserver.bootstrap

import org.springframework.boot.CommandLineRunner
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Component
import warsztat.warsztatserver.klient.Customer
import warsztat.warsztatserver.models.carmodels.CarMake
import warsztat.warsztatserver.models.carmodels.CarModel
import warsztat.warsztatserver.models.carmodels.CarPart
import warsztat.warsztatserver.models.servicestorymodels.ServiceComment
import warsztat.warsztatserver.models.servicestorymodels.ServiceRequest
import warsztat.warsztatserver.models.servicestorymodels.WorkDescription
import warsztat.warsztatserver.models.servicestorymodels.WorkDescriptionPartUsage
import warsztat.warsztatserver.models.users.Employee
import warsztat.warsztatserver.models.users.EmployeeAuthority
import warsztat.warsztatserver.models.util.Address
import warsztat.warsztatserver.repositories.*
import javax.transaction.Transactional

@Component
class Bootstrap (
    val customerRepository: CustomerRepository,
    val employeeRepository: EmployeeRepository,
    val applicationUserRepository: ApplicationUserRepository,
    val serviceRequestRepository: ServiceRequestRepository,
    val serviceCommentRepository: ServiceCommentRepository,
    val carMakeRepository: CarMakeRepository,
    val carModelRepository: CarModelRepository,
    val carPartRepository: CarPartRepository,
    val bCryptPasswordEncoder: BCryptPasswordEncoder,
) : CommandLineRunner {

    @Transactional
    override fun run(vararg args: String?) {
        var customer = Customer("customer1", bCryptPasswordEncoder.encode("pass"), "Jan Kowalski", "123123123", Address(
            "Kielce", "Sienkiewicza", 12, 1
        ))
        var employee = Employee(
            "employee1",
            bCryptPasswordEncoder.encode("password"),
            "Adam Nowak",
            "adam@nowak.com",
            "123123123",
            Address("Kielce", "Sienkiewicza", 100, 2),
            authority = EmployeeAuthority.MANAGER
        )

        customer = customerRepository.save(customer)
        employee = employeeRepository.save(employee)

        val users = applicationUserRepository.findAll()
        println(users)

        val req = ServiceRequest("Serwis 1", "Popsuł się samochód", customer)
        val comment = ServiceComment("komentarz jeden", "dobra, zrobimy", req, employee)

        val carMake = carMakeRepository.save(CarMake("Volkswagen", setOf()))
        val carModel = carModelRepository.save(CarModel("golf", "standard", carMake))
        val carPart = carPartRepository.save(CarPart("Zderzak", 100, 10, setOf(carModel), setOf()))

        comment.workDescriptions += WorkDescription("Wymiana zderzaka", 2, listOf(), comment)
        comment.workDescriptions[0].partUsages += WorkDescriptionPartUsage(comment.workDescriptions[0], carPart, 1)
        serviceCommentRepository.save(comment)

        serviceRequestRepository.save(req)
        serviceCommentRepository.save(comment)
    }
}