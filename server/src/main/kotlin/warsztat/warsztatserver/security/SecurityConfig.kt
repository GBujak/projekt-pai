package warsztat.warsztatserver.security

import org.springframework.context.annotation.Bean
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.security.web.csrf.CookieCsrfTokenRepository
import org.springframework.stereotype.Component
import warsztat.warsztatserver.security.filters.JwtTokenFilter
import javax.servlet.http.HttpServletResponse

@EnableWebSecurity
class SecurityConfig(val jwtTokenFilter: JwtTokenFilter) : WebSecurityConfigurerAdapter() {
    override fun configure(http: HttpSecurity) {
        http.cors().and().csrf().disable()

            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()

            .exceptionHandling()
                .authenticationEntryPoint({req, res, ex ->
                    res.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.message)
                }).and()

            .authorizeRequests()
                .antMatchers("/api/index/**").permitAll()
                .antMatchers("/api/auth/**").permitAll()
                .antMatchers("/api/debug/**").permitAll()
                .antMatchers("/api/customer/**").authenticated()
                .antMatchers("/api/car/info").permitAll()
                .antMatchers("/api/car/**").hasAnyAuthority("MECHANIC", "MANAGER", "ADMIN")
                .antMatchers("/api/car-part/**").hasAnyAuthority("MECHANIC", "MANAGER", "ADMIN")
                .antMatchers("/api/mechanic/**").hasAnyAuthority("MECHANIC", "MANAGER", "ADMIN")
                .antMatchers("/api/manager/**").hasAnyAuthority("MANAGER", "ADMIN")
                .antMatchers("/api/admin/**").hasAuthority("ADMIN")
                .anyRequest().authenticated().and()

            .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter::class.java)
    }

    @Bean
    fun passEncoder() = BCryptPasswordEncoder()

    @Bean
    override fun authenticationManagerBean(): AuthenticationManager =
        super.authenticationManagerBean()
}