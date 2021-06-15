# CarPartController.kt

Kontroler zawierający logikę zarządzania częściami w aplikacji. Pozwala na tworzenie
nowych części oraz dostawanie informacji, jakie części można użyć do serwisu
samochodu o danym modelu.

Jest to używane przy tworzeniu opisu pracy w komentarzu do historii serwisu.

## Klasy pomocnicze

```kotlin
class NewCarPart(
    val name: String,
    val price: Long,
    val ammountInStock: Long,
    val carModels: List<Long>,
)

class PartForModel (
    carPart: CarPart,
    val id: Long = carPart.id,
    val name: String = carPart.name,
    val price: Long = carPart.price,
    val amountInStock: Long = carPart.amountInStock,
)

class PartsForModelRequest (val modelId: Long)
```

## Klasa kontrolera

- `CarPartController.createNew` - tworzenie nowej części.
- `CarPartController.partsForModel` - części pasujące do danego modelu.

```kotlin
@RestController
@RequestMapping("/api/car-part")
class CarPartController (
    val carPartRepository: CarPartRepository,
    val carModelRepository: CarModelRepository,
) {
    @PostMapping("/create")
    fun createNew(@RequestBody newCarPart: NewCarPart): RestMessage<Long> {
        val carModels = mutableListOf<CarModel>()

        for (modelId in newCarPart.carModels) {
            val model = carModelRepository.findById(modelId)
            if (model.isEmpty) return RestMessage("Błąd: model o takim ID nie istnieje")
            carModels.add(model.get())
        }

        var carPart = CarPart(
            newCarPart.name,
            newCarPart.price,
            newCarPart.ammountInStock,
            carModels,
            mutableListOf(),
        )

        carPart = carPartRepository.save(carPart)
        println(carPart)
        println(carPart.carModels.map { it.modelName })
        return RestMessage("Ok", carPart.id)
    }

    @PostMapping("for-model")
    fun partsForModel(@RequestBody req: PartsForModelRequest): RestMessage<List<PartForModel>> {
        val model = carModelRepository.findById(req.modelId)
        if (model.isEmpty) return RestMessage("Błąd: nie ma modelu o takiej nazwie")

        return RestMessage(
            "Ok",
            model.get().carParts.map { PartForModel(it) }
        )
    }
}
```
