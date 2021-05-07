package warsztat.warsztatserver.repositories

import org.springframework.data.repository.CrudRepository
import warsztat.warsztatserver.models.servicestorymodels.ServiceComment
import warsztat.warsztatserver.models.servicestorymodels.ServiceRequest

interface ServiceCommentRepository : CrudRepository<ServiceComment, Long> {
    fun findFirstByServiceRequestOrderBySubmittedOn(serviceRequest: ServiceRequest): ServiceComment?
}