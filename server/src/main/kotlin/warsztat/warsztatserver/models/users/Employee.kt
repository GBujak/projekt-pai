package warsztat.warsztatserver.models.users

import warsztat.warsztatserver.models.util.Address
import javax.persistence.*

enum class EmployeeAuthority {
    WORKER,
    MANAGER,
    ADMINISTRATOR,
}

@Entity
class Employee (
    @Column(nullable = false, unique = true)
    val username: String,
    var password: String,

    var name: String,

    var email: String,
    var phoneNumber: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_address")
    var address: Address,

    var authority: EmployeeAuthority = EmployeeAuthority.WORKER,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
)