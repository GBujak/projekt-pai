package warsztat.warsztatserver.models.carmodels

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonManagedReference
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
    @JsonManagedReference
    var carModels: MutableList<CarModel> = mutableListOf(),

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
) {
    fun newModel(modelName: String, modelVariant: String): CarModel {
        val carModel = CarModel(modelName, modelVariant, carMake = this)
        this.carModels.add(carModel)
        return carModel
    }
}

@Entity
class CarModel (
    val modelName: String,
    val modelVariant: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_carmake") // nazwa kolumny przechowującej klucz obcy
    @JsonBackReference // Nie dodawaj do JSON - nieskończona rekurencja
    val carMake: CarMake?,

    @ManyToMany
    @JoinTable(
        name = "car_model_car_part",
        joinColumns = arrayOf(JoinColumn(name = "car_model_id")),
        inverseJoinColumns = arrayOf(JoinColumn(name = "car_part_id")),
    )
    var carParts: List<CarPart> = listOf(),

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
) {
    override fun toString(): String {
        return "CarModel(modelName=$modelName, modelVariant=$modelVariant, id=$id)"
    }
}