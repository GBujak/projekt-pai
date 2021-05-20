package warsztat.warsztatserver.models.servicestorymodels

import warsztat.warsztatserver.models.ApplicationUser
import warsztat.warsztatserver.models.carmodels.Car
import java.util.*
import javax.persistence.*

@Entity
data class ServiceRequest (
    val title: String,
    val description: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_submitter")
    val submitter: ApplicationUser,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_car")
    val car: Car,

    @Temporal(TemporalType.TIMESTAMP) // przechowuj w bazie danych jako pole TIMESTAMP (data i czas)
    val submittedOn: Date = Date(),

    var finished: Boolean = false,

    @ElementCollection
    var tags: List<String> = listOf(),

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_assignedworker", nullable = true)
    var assignedWorker: ApplicationUser? = null,

    @OneToMany(
        fetch = FetchType.LAZY,
        mappedBy = "serviceRequest",
        cascade = arrayOf(CascadeType.ALL),
        orphanRemoval = true,
    )
    var serviceComments: List<ServiceComment> = listOf(),

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
)