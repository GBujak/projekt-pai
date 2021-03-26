package warsztat.warsztatserver.klient

import warsztat.warsztatserver.models.ApplicationUser
import warsztat.warsztatserver.models.carmodels.Car
import javax.persistence.*

@Entity
class Customer (
    username: String,
    password: String,

    val name: String,
    var phoneNumber: String,

    @OneToMany(
        mappedBy = "owner",
        fetch = FetchType.LAZY,
        cascade = arrayOf(CascadeType.ALL),
        orphanRemoval = true,
    )
    var cars: Set<Car> = setOf(),

    id: Long = 0,

) : ApplicationUser(username, password, id)