package warsztat.warsztatserver.models.users

import warsztat.warsztatserver.models.ApplicationUser
import warsztat.warsztatserver.models.util.Address
import javax.persistence.*

enum class EmployeeAuthority {
    MECHANIC,
    MANAGER,
    ADMIN,
}

@Entity
class Employee (
    username: String,
    password: String,

    var name: String,

    var email: String,
    var phoneNumber: String,

    @ManyToOne(fetch = FetchType.LAZY, cascade = arrayOf(CascadeType.PERSIST))
    @JoinColumn(name = "fk_address")
    var address: Address,

    var authority: EmployeeAuthority = EmployeeAuthority.MECHANIC,

    @ElementCollection
    var specializes: List<String> = listOf(),

    id: Long = 0,

) : ApplicationUser (username, password, id)