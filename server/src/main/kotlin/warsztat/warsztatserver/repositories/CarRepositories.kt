package warsztat.warsztatserver.repositories

import org.springframework.data.repository.CrudRepository
import warsztat.warsztatserver.models.carmodels.CarMake
import warsztat.warsztatserver.models.carmodels.CarModel

interface CarMakeRepository : CrudRepository<CarMake, Long>

interface CarModelRepository : CrudRepository<CarModel, Long>