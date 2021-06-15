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
    val id: Long = carPart.id,
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
            val modelOpt = carModelRepository.findById(modelId)
            if (modelOpt.isEmpty) return RestMessage("Błąd: model o takim ID nie istnieje")
            val model = modelOpt.get()
            carModels.add(model)
        }

        var carPart = CarPart(
            newCarPart.name,
            newCarPart.price,
            newCarPart.ammountInStock,
            carModels,
            mutableListOf(),
        )

        carPart = carPartRepository.save(carPart)
        for (model in carModels) {
            model.carParts.add(carPart)
            carModelRepository.save(model)
        }

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