package warsztat.warsztatserver.security

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.exceptions.JWTDecodeException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import warsztat.warsztatserver.models.users.Employee
import warsztat.warsztatserver.repositories.ApplicationUserRepository
import javax.servlet.http.HttpServletRequest

@Component
final class JwtUtil(
    val appUserRepo: ApplicationUserRepository
) {
    val algorithm = Algorithm.HMAC512(SECRET)
    val verifier = JWT.require(algorithm).build()

    fun getAuthentication(token: String, request: HttpServletRequest): UsernamePasswordAuthenticationToken? {
        try {
            val decoded = verifier.verify(token)
            val subject = decoded.subject
            val user = appUserRepo.findByUsername(subject)
            val auth = UsernamePasswordAuthenticationToken(
                user?.id, token,
                if (user is Employee) mutableListOf(SimpleGrantedAuthority(user.authority.name))
                else mutableListOf(),
            )
            auth.details = WebAuthenticationDetailsSource().buildDetails(request)
            return auth
        } catch (e: JWTDecodeException) {
            return null
        }
    }

    fun userToken(username: String) = JWT.create().withSubject(username).sign(algorithm)
}