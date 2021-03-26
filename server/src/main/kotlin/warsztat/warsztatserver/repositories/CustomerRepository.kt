package warsztat.warsztatserver.repositories

import org.springframework.data.repository.CrudRepository
import warsztat.warsztatserver.klient.Customer

interface CustomerRepository : CrudRepository<Customer, Long> {
}