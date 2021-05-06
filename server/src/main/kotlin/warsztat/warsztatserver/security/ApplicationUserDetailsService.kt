package warsztat.warsztatserver.security

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service
import warsztat.warsztatserver.models.ApplicationUser
import warsztat.warsztatserver.models.users.Employee
import warsztat.warsztatserver.repositories.ApplicationUserRepository

data class ApplicationUserDetails(val applicationUser: ApplicationUser) : UserDetails {
    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return if (applicationUser is Employee) {
            mutableListOf(SimpleGrantedAuthority(applicationUser.authority.name))
        } else {
            mutableListOf()
        }
    }
    override fun getPassword() = applicationUser.password
    override fun getUsername() = applicationUser.username
    override fun isAccountNonExpired() = true
    override fun isAccountNonLocked() = true
    override fun isCredentialsNonExpired() = true
    override fun isEnabled() = true
}

@Service
class ApplicationUserDetailsService(val appUserRepo: ApplicationUserRepository) : UserDetailsService {
    override fun loadUserByUsername(username: String?): UserDetails? {
        if (username == null) return null
        val user = appUserRepo.findByUsername(username) ?: return null
        return ApplicationUserDetails(user)
    }
}