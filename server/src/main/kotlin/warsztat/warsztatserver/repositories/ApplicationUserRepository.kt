package warsztat.warsztatserver.repositories

import org.springframework.data.repository.CrudRepository
import warsztat.warsztatserver.models.ApplicationUser

interface ApplicationUserRepository : CrudRepository<ApplicationUser, Long> {
    fun findByUsername(username: String): ApplicationUser?
    fun existsByUsername(username: String): Boolean
}