package warsztat.warsztatserver.bootstrap

import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import warsztat.warsztatserver.models.ApplicationUser
import warsztat.warsztatserver.models.ApplicationUserType.REGULAR
import warsztat.warsztatserver.repositories.ApplicationUserRepository

@Component
class Bootstrap (
        val applicationUserRepository: ApplicationUserRepository
) : CommandLineRunner {

    override fun run(vararg args: String?) {
        val user = ApplicationUser("test", "test", REGULAR)
        val user2 = ApplicationUser("test2", "test", REGULAR)

        applicationUserRepository.save(user)
        applicationUserRepository.save(user2)

        println(applicationUserRepository.findAll().toList())
    }
}