package warsztat.warsztatserver.repositories

import org.springframework.data.repository.CrudRepository
import warsztat.warsztatserver.models.servicestorymodels.ServiceRequest

interface ServiceRequestRepository : CrudRepository<ServiceRequest, Long> {
}