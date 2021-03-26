package warsztat.warsztatserver.repositories

import org.springframework.data.repository.CrudRepository
import warsztat.warsztatserver.models.users.Employee

interface EmployeeRepository : CrudRepository<Employee, Long> {
}