# Użytkownicy

```kotlin
enum class ApplicationUserType {
    CUSTOMER,
    MECHANIC,
    MANAGER,
    ADMIN
}

@Entity
data class ApplicationUser (
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
        val id: Long = 0,
)
```

```kotlin
@Entity
class AccountCreationToken(
    val email: String,
    val tokenValue: UUID,
    val createsAccountType: ApplicationUserType,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_generatedby")
    val generatedBy: ApplicationUser,

    @Temporal(TemporalType.TIMESTAMP)
    val expiresOn: Date,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_account", nullable = true)
    var usedToCreate: ApplicationUser? = null,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
) {
    init {
        assert(createsAccountType != ApplicationUserType.CUSTOMER)
    }

    fun isExpired() = Date().after(this.expiresOn)
}
```
