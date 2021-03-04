package warsztat.warsztatserver.security

import org.springframework.context.annotation.Bean
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.csrf.CookieCsrfTokenRepository
import org.springframework.stereotype.Component

@Component
class SecurityConfig : WebSecurityConfigurerAdapter() {
    override fun configure(http: HttpSecurity) {
        http
            .authorizeRequests()
                .antMatchers("/api/index").permitAll()
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .loginPage("/api/login")
                .permitAll()
                .and()
            .logout()
                .deleteCookies()
                .permitAll()
                .and()
            .csrf()
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .disable() // TODO: Włącz CSRF, gdy będzie gotowy klient
    }

    // Configure password encoder
    @Bean
    fun passEncoder() = BCryptPasswordEncoder()
}