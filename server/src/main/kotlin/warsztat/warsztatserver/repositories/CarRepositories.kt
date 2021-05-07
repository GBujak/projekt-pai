package warsztat.warsztatserver.repositories

import org.springframework.data.repository.CrudRepository
import warsztat.warsztatserver.models.carmodels.CarMake
import warsztat.warsztatserver.models.carmodels.CarModel
import warsztat.warsztatserver.models.carmodels.CarPart

interface CarMakeRepository : CrudRepository<CarMake, Long>

interface CarModelRepository : CrudRepository<CarModel, Long>

interface CarPartRepository : CrudRepository<CarPart, Long>