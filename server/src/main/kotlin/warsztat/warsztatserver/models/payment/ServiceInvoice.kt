package warsztat.warsztatserver.models.payment

import warsztat.warsztatserver.models.servicestorymodels.ServiceRequest
import java.util.*
import javax.persistence.*

@Entity
class ServiceInvoice (
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_service")
    val service: ServiceRequest,

    val buyer: String,
    val street: String,
    val postalCity: String,

    @Temporal(TemporalType.TIMESTAMP)
    val createdDate: Date = Date(),

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    val id: Long = 0,
) {
    fun displayName() = "$id / $createdDate"
}