package warsztat.warsztatserver.models.carmodels

import java.util.*
import javax.persistence.*

fun CarPart.createPurchase(ammount: Int, pricePerUnit: Int, date: Date = Date()) =
    CarPartPurchase(ammount, pricePerUnit, carPart = this, purchaseDate = date)

@Entity
class CarPartPurchase(
    val ammount: Int,
    val pricePerUnit: Int,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_carpart")
    val carPart: CarPart,

    @Temporal(TemporalType.TIMESTAMP)
    val purchaseDate: Date = Date(),

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    val id: Long = 0,
)