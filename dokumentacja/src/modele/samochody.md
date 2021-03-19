# Modele związane z samochodami

```kotlin
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
    var carModels: Set<CarModel>,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
) {
    fun newModel(modelName: String, modelVariant: String): CarModel {
        val carModel = CarModel(modelName, modelVariant, carMake = this)
        this.carModels += carModel
        return carModel
    }
}
```

```kotlin
@Entity
class CarModel (
    val modelName: String,
    val modelVariant: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_carmake") // nazwa kolumny przechowującej klucz obcy
    @JsonBackReference // Nie dodawaj do JSON - nieskończona rekurencja
    val carMake: CarMake,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
) {
    override fun toString(): String {
        return "CarModel(modelName=$modelName, modelVariant=$modelVariant, id=$id)"
    }
}
```

```kotlin
@Entity
class CarPart (
    val name: String,
    var price: Long,
    var amountInStock: Long,

    @ManyToMany
    val carModel: Set<CarModel>,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
)
```
