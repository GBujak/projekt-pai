package warsztat.warsztatserver.klient

import warsztat.warsztatserver.models.ApplicationUser
import warsztat.warsztatserver.models.carmodels.Car
import warsztat.warsztatserver.models.servicestorymodels.ServiceRequest
import warsztat.warsztatserver.models.util.Address
import javax.persistence.*

@Entity
class Customer (
    username: String,
    password: String,

    val name: String,
    var phoneNumber: String,

    @ManyToOne(fetch = FetchType.LAZY, cascade = arrayOf(CascadeType.PERSIST))
    @JoinColumn(name = "fk_address")
    var address: Address,

    @OneToMany(
        mappedBy = "owner",
        fetch = FetchType.LAZY,
        cascade = arrayOf(CascadeType.ALL),
        orphanRemoval = true,
    )
    var cars: List<Car> = listOf(),

    @OneToMany(
        mappedBy = "submitter",
        fetch = FetchType.LAZY,
        cascade = arrayOf(CascadeType.PERSIST),
        orphanRemoval = true,
    )
    val serviceRequests: List<ServiceRequest> = listOf(),

    id: Long = 0,

    ) : ApplicationUser(username, password, id)