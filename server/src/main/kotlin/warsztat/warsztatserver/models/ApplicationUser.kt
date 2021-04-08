package warsztat.warsztatserver.models

import javax.persistence.*

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
open class ApplicationUser protected constructor (
        @Column(nullable = false, unique = true)
        open val username: String,
        open var password: String,

        // Argumenty o wartościach domyślnych na końcu
        //
        // Ustawienie id na 0 spowoduje wygenerowanie id przez bazę
        // danych przy zapisywaniu do repozytorium
        @Id
        @GeneratedValue(strategy = GenerationType.SEQUENCE)
        open val id: Long = 0,
)