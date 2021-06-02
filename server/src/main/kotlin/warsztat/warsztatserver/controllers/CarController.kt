package warsztat.warsztatserver.controllers

import org.springframework.web.bind.annotation.*
import warsztat.warsztatserver.models.carmodels.CarMake
import warsztat.warsztatserver.models.carmodels.CarModel
import warsztat.warsztatserver.models.util.RestMessage
import warsztat.warsztatserver.repositories.CarMakeRepository
import warsztat.warsztatserver.repositories.CarModelRepository

class NewMakeRequest(val makeName: String)
class NewModelRequest(val makeId: Long, val modelName: String, val modelVariant: String)

class CarMakeRest(
    carMake: CarMake,
    val name: String = carMake.makeName,
    val id: Long = carMake.id,
    val carModels: List<CarModelRest> = carMake.carModels.map { CarModelRest(it) },
)

class CarModelRest(
    carModel: CarModel,
    val name: String = carModel.modelName,
    val variant: String = carModel.modelVariant,
    val id: Long = carModel.id,
)

class CarInfoRest(
    makes: List<CarMake>,
    val carInfo: List<CarMakeRest> = makes.map { CarMakeRest(it) },
)

@RestController
@RequestMapping("/api/car")
class CarController (
    val carModelRepository: CarModelRepository,
    val carMakeRepository: CarMakeRepository,
) {
    @GetMapping("/info")
    fun carInfo(): RestMessage<CarInfoRest>
        = RestMessage("Ok", CarInfoRest(carMakeRepository.findAll().toList()))

    @PostMapping("/new-make")
    fun newMake(@RequestBody req: NewMakeRequest): RestMessage<Long> {
        val make = carMakeRepository.save(CarMake(req.makeName))
        return RestMessage("Ok", make.id)
    }

    @RequestMapping("new-model")
    fun newModel(@RequestBody req: NewModelRequest): RestMessage<Unit> {
        val makeOpt = carMakeRepository.findById(req.makeId)
        if (makeOpt.isEmpty) return RestMessage("Błąd: nie ma takiej marki")
        val make = makeOpt.get()
        make.newModel(req.modelName, req.modelVariant)
        val model = CarModel(req.modelName, req.modelVariant, null)
        make.carModels.add(model)
        carMakeRepository.save(make)
        return RestMessage("Ok")
    }
}