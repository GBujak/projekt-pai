package warsztat.warsztatserver.controllers

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import warsztat.warsztatserver.models.ApplicationUser
import warsztat.warsztatserver.repositories.ApplicationUserRepository
import warsztat.warsztatserver.security.ApplicationUserDetails
import javax.transaction.Transactional

@RestController
@RequestMapping("/api/debug")
class DebugController(
    val applicationUserRepository: ApplicationUserRepository,
) {
    @GetMapping("/whoami")
    @Transactional
    fun whoAmI(): Map<String, String> {
        val user = SecurityContextHolder.getContext().authentication.principal as ApplicationUser
        return mapOf(
            "username" to user.username,
            "passEncoded" to user.password,
        )
    }
}