package warsztat.warsztatserver.repositories

import org.springframework.data.repository.CrudRepository
import warsztat.warsztatserver.models.users.Employee
import warsztat.warsztatserver.models.users.EmployeeAuthority

interface EmployeeRepository : CrudRepository<Employee, Long> {
    fun findAllByAuthority(authority: EmployeeAuthority): List<Employee>
}