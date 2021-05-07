package warsztat.warsztatserver.models.servicestorymodels

import warsztat.warsztatserver.models.carmodels.CarPart
import javax.persistence.*

@Entity
class WorkDescriptionPartUsage (
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_workdescription")
    val workDescription: WorkDescription?,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_part")
    val carPart: CarPart,

    val ammount: Int = 1,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
)