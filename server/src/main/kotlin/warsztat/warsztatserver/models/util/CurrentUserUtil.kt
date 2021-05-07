package warsztat.warsztatserver.models.util

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import warsztat.warsztatserver.models.ApplicationUser
import warsztat.warsztatserver.repositories.ApplicationUserRepository

@Component
class CurrentUserUtil (
    val applicationUserRepository: ApplicationUserRepository,
) {
    fun getCurrentUser(): ApplicationUser {
        val id = SecurityContextHolder.getContext().authentication.principal as Long
        val user = applicationUserRepository.findById(id)
        return user.get()
    }

    final inline fun <reified T: ApplicationUser>getCurrentUserIfVariant(): T? {
        val current = getCurrentUser()
        return if (current is T) { current } else { null }
    }
}