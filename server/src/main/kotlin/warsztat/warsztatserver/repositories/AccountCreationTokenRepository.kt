package warsztat.warsztatserver.repositories

import org.springframework.data.repository.CrudRepository
import warsztat.warsztatserver.models.AccountCreationToken
import java.util.*

interface AccountCreationTokenRepository : CrudRepository<AccountCreationToken, Long> {
    fun findByExpiresOnAfterAndUsedToCreateIsNull(expiresOn: Date): List<AccountCreationToken>
    fun findByTokenValue(tokenValue: UUID): AccountCreationToken?
}