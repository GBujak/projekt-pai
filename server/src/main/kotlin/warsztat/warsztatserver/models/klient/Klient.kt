package warsztat.warsztatserver.klient

import javax.persistence.*

@Entity
data class Klient (
    val klientName: String,
    val klientSurname: String,
    var klientTel: Long,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0
) {
    override fun toString(): String {
        return "Klient(klientName=$klientName, klientSurname=$klientSurname, klientTel=$klientTel)"
    }
}