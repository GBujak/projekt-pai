package warsztat.warsztatserver.klient

import warsztat.warsztatserver.models.carmodels.Car
import javax.persistence.*

@Entity
data class Customer (
    @Column(nullable = false, unique = true)
    val username: String,
    val name: String,
    var phoneNumber: String,

    @OneToMany(
        mappedBy = "owner",
        fetch = FetchType.LAZY,
        cascade = arrayOf(CascadeType.ALL),
        orphanRemoval = true,
    )
    var cars: Set<Car> = setOf(),

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0
)