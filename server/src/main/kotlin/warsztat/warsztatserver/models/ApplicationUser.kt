package warsztat.warsztatserver.models

import javax.persistence.*

enum class ApplicationUserType {
    REGULAR,
    MANAGER,
    ADMIN
}

@Entity
data class ApplicationUser(
        @Column(nullable = false, unique = true)
        val username: String,
        var password: String,

        @Column(nullable = false)
        val userType: ApplicationUserType,

        // Argumenty o wartościach domyślnych na końcu
        //
        // Ustawienie id na 0 spowoduje wygenerowanie id przez bazę
        // danych przy zapisywaniu do repozytorium
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int = 0,
)