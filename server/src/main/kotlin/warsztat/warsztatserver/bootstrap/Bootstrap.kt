package warsztat.warsztatserver.bootstrap

import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import warsztat.warsztatserver.models.ApplicationUser
import warsztat.warsztatserver.models.ApplicationUserType.*
import warsztat.warsztatserver.models.carmodels.CarMake
import warsztat.warsztatserver.models.carmodels.CarModel
import warsztat.warsztatserver.repositories.ApplicationUserRepository
import warsztat.warsztatserver.repositories.CarMakeRepository
import warsztat.warsztatserver.repositories.CarModelRepository
import javax.transaction.Transactional

@Component
class Bootstrap (
        val applicationUserRepository: ApplicationUserRepository,
        val carMakeRepository: CarMakeRepository,
        val carModelRepository: CarModelRepository,
) : CommandLineRunner {

    @Transactional
    override fun run(vararg args: String?) {
        val user = ApplicationUser("test", "test", CUSTOMER)
        val user2 = ApplicationUser("test2", "test", CUSTOMER)

        applicationUserRepository.save(user)
        applicationUserRepository.save(user2)

        println(applicationUserRepository.findAll().toList())

        var carMake = CarMake("Volkswagen", HashSet())
        carMake.carModels += setOf(
                CarModel("Golf", "regular", carMake),
                CarModel("Passat", "regular", carMake),
        )

        carMakeRepository.save(carMake)

        println(carMakeRepository.findAll())

        println("carModelRepository ${carModelRepository.findAll()}")
        carMakeRepository.deleteById(1)
        println("carModelRepository ${carModelRepository.findAll()}")
    }
}