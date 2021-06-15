# AuthController.kt

Jest to kontroler, w którym zaimplementowaliśmy funkcje logowania i rejestracji.
Aplikacja używa technologii Json Web Token (JWT) do uwierzytelniania. Tokeny są
generowane przez metodę login tego kontrolera. Metoda register zawiera logikę
tworzącą konta użytkowników i zapisującą je do bazy danych.

## Klasy pomocnicze

```kotlin
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
```

## Klasa kontrolera

- `AuthController.register` - rejestracja bez tokena tworzenia konta. Metoda ta jest
  wywoływana przy rejestracji konta użytkownika.
- `AuthController.login` - logowanie się. Tutaj jest tworzony token JWT. Każdy
  użytkownik aplikacji loguje się z wykorzystaniem tej metody.

```kotlin
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
```
