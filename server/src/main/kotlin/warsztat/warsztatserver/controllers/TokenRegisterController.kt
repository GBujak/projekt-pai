package warsztat.warsztatserver.controllers

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import warsztat.warsztatserver.models.AccountCreationToken
import warsztat.warsztatserver.models.ApplicationUser
import warsztat.warsztatserver.models.users.Employee
import warsztat.warsztatserver.models.users.EmployeeAuthority
import warsztat.warsztatserver.models.util.Address
import warsztat.warsztatserver.models.util.CurrentUserUtil
import warsztat.warsztatserver.models.util.RestMessage
import warsztat.warsztatserver.repositories.AccountCreationTokenRepository
import warsztat.warsztatserver.repositories.EmployeeRepository
import java.util.*

data class CreateTokensRequest(
    val newTokens: List<NewToken>,
)

data class NewToken (
    val email: String,
    val grantedAuthority: String,
    val expiresOn: Long,
)

data class NewAddressRequest(
    val city: String,
    val street: String,
    val houseNumber: Int,
)

data class TokenRegisterRequest(
    val tokenValue: String,
    val username: String,
    val password: String,
    val name: String,
    val phoneNumber: String,
    val address: NewAddressRequest,
)

data class ActiveTokenRest(
    val tokenValue: String,
    val expiresOn: Long,
    val email: String,
    val grantedAuthority: String,
)

@RestController
@RequestMapping("/api/token-register")
class TokenRegisterController (
    val tokenRepository: AccountCreationTokenRepository,
    val currentUserUtil: CurrentUserUtil,
    val employeeRepository: EmployeeRepository,
    val bCryptPasswordEncoder: BCryptPasswordEncoder,
) {
    @PostMapping("/create-tokens")
    fun createTokens(@RequestBody newTokens: CreateTokensRequest): RestMessage<Unit> {
        val user = currentUserUtil.getCurrentUser()
        println(newTokens)
        for (newTok in newTokens.newTokens) {
            val uuid = UUID.randomUUID()
            val tok = AccountCreationToken(
                newTok.email,
                uuid,
                EmployeeAuthority.values()
                    .first { it.name.toLowerCase() == newTok.grantedAuthority },
                user,
                Date(newTok.expiresOn),
            )
            tokenRepository.save(tok)
        }
        return RestMessage("Ok")
    }

    @PostMapping("/get-tokens")
    fun getTokens(): RestMessage<List<ActiveTokenRest>> {
        return RestMessage("Ok", tokenRepository.findByExpiresOnAfterAndUsedToCreateIsNull(Date())
            .map { ActiveTokenRest(
                it.tokenValue.toString(),
                it.expiresOn.time,
                it.email,
                it.grantedAutority.name.toLowerCase(),
            )})
    }

    @PostMapping("/register")
    fun tokenRegister(@RequestBody req: TokenRegisterRequest): RestMessage<Unit> {
        val token = tokenRepository.findByTokenValue(UUID.fromString(req.tokenValue))
        if (token == null) {
            return RestMessage("Błąd: nie ma takiego tokenu")
        }
        if (token.isExpired()) {
            return RestMessage("Błąd: token wygasł")
        }

        var newEmployee = with (req) {
            Employee(
                username,
                bCryptPasswordEncoder.encode(password),
                name,
                token.email,
                phoneNumber,
                Address(
                    address.city,
                    address.street,
                    address.houseNumber
                ),
                token.grantedAutority
            )
        }

        newEmployee = employeeRepository.save(newEmployee)
        token.usedToCreate = newEmployee
        tokenRepository.save(token)

        return RestMessage("Ok")
    }
}