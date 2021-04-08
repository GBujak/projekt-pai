package warsztat.warsztatserver.models.servicestorymodels

import warsztat.warsztatserver.models.users.Employee
import java.time.LocalDateTime
import java.time.ZoneId
import java.util.*
import javax.persistence.*

@Entity
class EmployeeAssignment(
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_worker")
    val employee: Employee,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_servicerequest")
    val serviceRequest: ServiceRequest,

    val expectedWorkHours: Int,

    @Temporal(TemporalType.DATE)
    val assignedOn: Date = Date(),

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    val id: Long = 0,
) {
    fun expectedFinishedDate() = Date.from(
        LocalDateTime.from(assignedOn.toInstant())
            .plusDays(Math.ceil((expectedWorkHours.toDouble()) / 8).toLong())
            .atZone(ZoneId.systemDefault())
            .toInstant()
    )
}