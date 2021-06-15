package warsztat.warsztatserver.controllers

import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import warsztat.warsztatserver.klient.Customer
import warsztat.warsztatserver.models.ApplicationUser
import warsztat.warsztatserver.models.users.Employee
import warsztat.warsztatserver.models.util.Address
import warsztat.warsztatserver.models.util.RestMessage
import warsztat.warsztatserver.repositories.ApplicationUserRepository
import warsztat.warsztatserver.repositories.CustomerRepository
import warsztat.warsztatserver.security.ApplicationUserDetails
import warsztat.warsztatserver.security.JwtUtil
import java.lang.Exception

data class AuthRequest(val username: String, val password: String)
data class LoginResponse(val token: String, val username: String, val accountType: String)
data class RegisterResponse(val message: String)

data class UserRegisterRequest (
    val username: String,
    val password: String,
    val name: String,
    val phoneNumber: String,
    val address: NewAddressRequest,
)

@RestController
@RequestMapping("/api/auth")
class AuthController (
    val applicationUserRepository: ApplicationUserRepository,
    val bCryptPasswordEncoder: BCryptPasswordEncoder,
    val authenticationManager: AuthenticationManager,
    val customerRepository: CustomerRepository,
    val jwtUtil: JwtUtil,
) {
    @PostMapping("register")
    fun register(@RequestBody req: UserRegisterRequest): RestMessage<Unit> {
        val customer = Customer(
            req.username,
            bCryptPasswordEncoder.encode(req.password),
            req.name,
            req.phoneNumber,
            Address(
                req.address.city,
                req.address.street,
                req.address.houseNumber,
            ),
        )
        customerRepository.save(customer)
        return RestMessage("Ok")
    }

    @PostMapping("/login")
    fun login(@RequestBody authRequest: AuthRequest): ResponseEntity<LoginResponse> {
        val (username, password) = authRequest
        try {
            val authentication = authenticationManager
                .authenticate(UsernamePasswordAuthenticationToken(username, password))
            val user = authentication.principal as ApplicationUserDetails
            val applicationUser = applicationUserRepository.findByUsername(user.username)!!
            val token = jwtUtil.userToken(user.username)
            return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, token)
                .body(LoginResponse(token, applicationUser.username,
                    if (applicationUser is Employee) applicationUser.authority.name.toLowerCase()
                    else "customer"))
        } catch (e: Exception) {
            throw e
        }
    }
}