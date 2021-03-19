package warsztat.warsztatserver.models.servicestorymodels

import warsztat.warsztatserver.models.ApplicationUser
import warsztat.warsztatserver.models.ApplicationUserType
import java.util.*
import javax.persistence.*

@Entity
class ServiceComment (
    var title: String,
    var bodyText: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_servicerequest")
    val serviceRequest: ServiceRequest,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_submitter")
    val submitter: ApplicationUser,

    @OneToMany(
        fetch = FetchType.LAZY,
        mappedBy = "serviceComment",
        cascade = arrayOf(CascadeType.ALL),
        orphanRemoval = true,
    )
    var workDescriptions: Set<WorkDescription> = setOf(),

    @Temporal(TemporalType.TIMESTAMP)
    val submittedOn: Date = Date(),

    @Column(nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    var editedOn: Date? = null,

    val submitterRole: ApplicationUserType = submitter.userType,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
)