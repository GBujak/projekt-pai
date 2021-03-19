package warsztat.warsztatserver.models.servicestorymodels

import warsztat.warsztatserver.models.carmodels.CarPart
import javax.persistence.*

@Entity
class WorkDescription (
    val workName: String,
    val workHours: Int,

    @ManyToMany
    var usedParts: Set<CarPart>,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
)