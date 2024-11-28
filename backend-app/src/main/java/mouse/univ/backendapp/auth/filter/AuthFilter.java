package mouse.univ.backendapp.auth.filter;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import mouse.univ.backendapp.auth.service.UserBindService;
import mouse.univ.backendapp.dto.user.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Log4j2
public class AuthFilter extends OncePerRequestFilter {

    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String TOKEN_PREFIX = "Bearer ";
    private UserBindService userBindService;
    private JWTVerifier verifier;

    public AuthFilter() {
        String secret = System.getenv("HMAC_SECRET");
        if (secret != null) {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            verifier = JWT.require(algorithm).build();
        }
    }
    @Autowired
    public void setUserBindService(UserBindService userBindService) {
        this.userBindService = userBindService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        String header = request.getHeader(AUTHORIZATION_HEADER);

        if (header != null && header.startsWith(TOKEN_PREFIX)) {
            String token = header.replace(TOKEN_PREFIX, "").trim();

            try {
                DecodedJWT decodedJWT = verifier.verify(token);
                String sub = decodedJWT.getSubject();
                UserDetails userDetails = userBindService.provideUserDetails(sub, null);
                request.setAttribute("user", userDetails);
            } catch (Exception e) {
                UserDetails userDetails = UserDetails.none();
                logger.debug(e.getMessage());
                request.setAttribute("user", userDetails);
            }
        } else {
            UserDetails userDetails = UserDetails.none();
            request.setAttribute("user", userDetails);
        }

        filterChain.doFilter(request, response);
    }
}
