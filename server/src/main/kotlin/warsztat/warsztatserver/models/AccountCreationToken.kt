package warsztat.warsztatserver.models

import warsztat.warsztatserver.models.users.EmployeeAuthority
import java.util.*
import javax.persistence.*

@Entity
class AccountCreationToken(
    val email: String,
    val tokenValue: UUID,
    val grantedAutority: EmployeeAuthority,

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
    fun isExpired() = Date().after(this.expiresOn)
}