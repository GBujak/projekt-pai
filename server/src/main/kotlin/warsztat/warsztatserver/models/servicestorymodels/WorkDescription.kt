package warsztat.warsztatserver.models.servicestorymodels

import com.fasterxml.jackson.annotation.JsonBackReference
import warsztat.warsztatserver.models.users.Employee
import javax.persistence.*

@Entity
class WorkDescription (
    val workName: String,
    val workHours: Int,

    @OneToMany(
        fetch = FetchType.LAZY,
        mappedBy = "workDescription",
        cascade = arrayOf(CascadeType.ALL),
        orphanRemoval = true,
    )
    var partUsages: MutableList<WorkDescriptionPartUsage>,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_servicecomment")
    @JsonBackReference
    val serviceComment: ServiceComment,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
) {
    init {
        assert(serviceComment.submitter is Employee)
    }
}
