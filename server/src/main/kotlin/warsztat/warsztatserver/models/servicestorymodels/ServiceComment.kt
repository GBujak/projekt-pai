package warsztat.warsztatserver.models.servicestorymodels

import com.sun.istack.Nullable
import warsztat.warsztatserver.models.ApplicationUser
import warsztat.warsztatserver.models.ApplicationUserType
import java.util.*
import javax.persistence.*

@Entity
class ServiceComment (
    @Temporal(TemporalType.TIMESTAMP)
    val submittedOn: Date,

    @Nullable
    @Temporal(TemporalType.TIMESTAMP)
    var editedOn: Date?,

    var title: String,
    var bodyText: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_servicerequest")
    val serviceRequest: ServiceRequest,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_submitter")
    val submitter: ApplicationUser,
    val submitterRole: ApplicationUserType,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
)