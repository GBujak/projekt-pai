package warsztat.warsztatserver.controllers

import warsztat.warsztatserver.models.carmodels.Car
import warsztat.warsztatserver.models.servicestorymodels.ServiceRequest
import warsztat.warsztatserver.models.users.Employee
import java.util.*

class RestServiceRequest (
    serviceRequest: ServiceRequest,
    val id: Long = serviceRequest.id,
    val carModel: String = serviceRequest.car.model.modelName,
    val carMake: String = serviceRequest.car.model.carMake!!.makeName,
    val date: Date = serviceRequest.submittedOn,
    val tags: List<String> = serviceRequest.tags,
    val finished: Boolean = serviceRequest.finished,
    val assignedMechanic: String = if (serviceRequest.assignedWorker != null)
        (serviceRequest.assignedWorker as Employee).name else "",
)

class CarRest(
    car: Car,
    val id: Long = car.id,
    val name: String = "${car.model.carMake!!.makeName} ${car.model.modelName}",
    val mileage: Int = car.lastMileage,
)
