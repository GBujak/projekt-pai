package warsztat.warsztatserver.repositories

import org.springframework.data.repository.CrudRepository
import warsztat.warsztatserver.models.payment.ServiceInvoice
import warsztat.warsztatserver.models.servicestorymodels.ServiceRequest

interface ServiceInvoiceRepository : CrudRepository<ServiceInvoice, Long> {
    fun findByService(serviceRequest: ServiceRequest): ServiceInvoice?
}