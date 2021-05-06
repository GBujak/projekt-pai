package warsztat.warsztatserver.security.filters

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.exceptions.JWTDecodeException
import com.auth0.jwt.interfaces.DecodedJWT
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.http.HttpHeaders
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import warsztat.warsztatserver.models.ApplicationUser
import warsztat.warsztatserver.security.*
import java.io.IOException
import java.util.*
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class JwtTokenFilter(val jwtUtil: JwtUtil): OncePerRequestFilter() {
    override fun doFilterInternal(req: HttpServletRequest, res: HttpServletResponse, chain: FilterChain) {
        val header: String? = req.getHeader(HttpHeaders.AUTHORIZATION)
        if (header == null || !header.startsWith("Bearer ")) {
            chain.doFilter(req, res)
            return
        }

        val token = header.split(" ")[1].trim()

        val authentication = jwtUtil.getAuthentication(token, req)
        if (authentication == null) {
            chain.doFilter(req, res)
            return
        }

        SecurityContextHolder.getContext().authentication = authentication
        chain.doFilter(req, res)
    }
}