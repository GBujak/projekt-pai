package warsztat.warsztatserver.models.carmodels

import javax.persistence.*

@Entity
data class CarMake (
    val makeName: String,

    @OneToMany(
        fetch = FetchType.LAZY,
        mappedBy = "carMake", // nazwa zmiennej w klasie CarModel reprezentującej powiązanie
        cascade = arrayOf(CascadeType.ALL),
        orphanRemoval = true,
    )
    var carModels: Set<CarModel>,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
)

@Entity
class CarModel (
    val modelName: String,
    val modelVariant: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_carmake") // nazwa kolumny przechowującej klucz obcy
    val carMake: CarMake,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
) {
    override fun toString(): String {
        return "CarModel(modelName=$modelName, modelVariant=$modelVariant, id=$id)"
    }
}