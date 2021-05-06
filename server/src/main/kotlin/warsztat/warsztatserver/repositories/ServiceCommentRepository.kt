package warsztat.warsztatserver.repositories

import org.springframework.data.repository.CrudRepository
import warsztat.warsztatserver.models.servicestorymodels.ServiceComment

interface ServiceCommentRepository : CrudRepository<ServiceComment, Long> {
}