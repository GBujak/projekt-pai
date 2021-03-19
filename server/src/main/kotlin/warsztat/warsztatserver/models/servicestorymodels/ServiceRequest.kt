package warsztat.warsztatserver.models.servicestorymodels

import com.sun.istack.Nullable
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

    @Column(nullable = true)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_assignedworker")
    val assignedWorker: ApplicationUser?,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
)