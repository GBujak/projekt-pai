package warsztat.warsztatserver.models.carmodels

import javax.persistence.*

@Entity
class CarPart (
    val name: String,
    var price: Long,
    var amountInStock: Long,

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "carParts", cascade = [CascadeType.PERSIST])
    val carModel: List<CarModel>,

    @OneToMany(
        fetch = FetchType.LAZY,
        mappedBy = "carPart",
        cascade = [CascadeType.ALL],
        orphanRemoval = true,
    )
    var purchases: List<CarPartPurchase>,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
)