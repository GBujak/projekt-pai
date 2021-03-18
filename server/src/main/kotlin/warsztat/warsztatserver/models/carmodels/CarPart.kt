package warsztat.warsztatserver.models.carmodels

import javax.persistence.*

@Entity
class CarPart (
        val name: String,
        var price: Long,
        var amountInStock: Long,

        @ManyToMany
        val carModel: Set<CarModel>,

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long,
)