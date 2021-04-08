package warsztat.warsztatserver.models.carmodels

import javax.persistence.*

@Entity
class CarPart (
    val name: String,
    var price: Long,
    var amountInStock: Long,

    @ManyToMany(fetch = FetchType.LAZY)
    val carModel: Set<CarModel>,

    @OneToMany(
        fetch = FetchType.LAZY,
        mappedBy = "carPart",
        cascade = arrayOf(CascadeType.ALL),
        orphanRemoval = true,
    )
    var purchases: Set<CarPartPurchase>,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
)