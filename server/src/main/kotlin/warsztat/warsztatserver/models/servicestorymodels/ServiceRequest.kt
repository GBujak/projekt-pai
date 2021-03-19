package warsztat.warsztatserver.models.servicestorymodels

import warsztat.warsztatserver.models.ApplicationUser
import java.util.*
import javax.persistence.*

@Entity
data class ServiceRequest (
    @Temporal(TemporalType.TIMESTAMP) // przechowuj w bazie danych jako pole TIMESTAMP (data i czas)
    val submittedOn: Date,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_submitter")
    val submitter: ApplicationUser,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_assignedworker", nullable = true)
    val assignedWorker: ApplicationUser?,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
)