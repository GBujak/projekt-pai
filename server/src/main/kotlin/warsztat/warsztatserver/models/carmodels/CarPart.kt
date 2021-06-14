package warsztat.warsztatserver.models.carmodels

import javax.persistence.*

@Entity
class CarPart(
    val name: String,
    var price: Long,
    var amountInStock: Long,

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "carParts", cascade = [CascadeType.PERSIST])
    val carModels: MutableList<CarModel>,

    @OneToMany(
        fetch = FetchType.LAZY,
        mappedBy = "carPart",
        cascade = [CascadeType.ALL],
        orphanRemoval = true,
    )
    var purchases: MutableList<CarPartPurchase>,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
)