package warsztat.warsztatserver.repositories

import org.springframework.data.repository.CrudRepository
import warsztat.warsztatserver.models.carmodels.Car
import warsztat.warsztatserver.models.carmodels.CarMake
import warsztat.warsztatserver.models.carmodels.CarModel
import warsztat.warsztatserver.models.carmodels.CarPart

interface CarRepository : CrudRepository<Car, Long>

interface CarMakeRepository : CrudRepository<CarMake, Long> {
    fun findByMakeName(makeName: String): CarMake?
}

interface CarModelRepository : CrudRepository<CarModel, Long> {
    fun findByModelName(modelName: String): CarModel?
}

interface CarPartRepository : CrudRepository<CarPart, Long>