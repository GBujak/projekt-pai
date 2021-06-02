package warsztat.warsztatserver.controllers

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import warsztat.warsztatserver.models.carmodels.CarModel
import warsztat.warsztatserver.models.carmodels.CarPart
import warsztat.warsztatserver.models.util.RestMessage
import warsztat.warsztatserver.repositories.CarModelRepository
import warsztat.warsztatserver.repositories.CarPartRepository

class NewCarPart(
    val name: String,
    val price: Long,
    val ammountInStock: Long,
    val carModels: List<Long>,
)

class PartForModel (
    carPart: CarPart,
    val name: String = carPart.name,
    val price: Long = carPart.price,
    val amountInStock: Long = carPart.amountInStock,
)

class PartsForModelRequest (val modelId: Long)

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
            listOf(),
        )

        carPart = carPartRepository.save(carPart)
        println(carPart)
        println(carPart.carModel.map { it.modelName })
        return RestMessage("Ok", carPart.id)
    }

    fun partsForModel(@RequestBody req: PartsForModelRequest): RestMessage<List<PartForModel>> {
        val model = carModelRepository.findById(req.modelId)
        if (model.isEmpty) return RestMessage("Błąd: nie ma modelu o takiej nazwie")

        return RestMessage(
            "Ok",
            model.get().carParts.map { PartForModel(it) }
        )
    }
}