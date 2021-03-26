package warsztat.warsztatserver.models.carmodels

import warsztat.warsztatserver.klient.Customer
import javax.persistence.*

@Entity
class Car (
    val productionYear: Int,
    var lastMileage: Int,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_carmodel")
    val model: CarModel,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_customer")
    val owner: Customer,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
)