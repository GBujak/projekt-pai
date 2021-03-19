package warsztat.warsztatserver.models.servicestorymodels

import com.fasterxml.jackson.annotation.JsonBackReference
import warsztat.warsztatserver.models.carmodels.CarPart
import javax.persistence.*

@Entity
class WorkDescription (
    val workName: String,
    val workHours: Int,

    @ManyToMany
    var usedParts: Set<CarPart>,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_servicecomment")
    @JsonBackReference
    val serviceComment: ServiceComment,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
)