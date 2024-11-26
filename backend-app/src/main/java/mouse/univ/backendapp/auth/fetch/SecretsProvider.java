package mouse.univ.backendapp.auth.fetch;

import org.springframework.stereotype.Service;

@Service
public class SecretsProvider {
    public String getClientId() {
        return System.getenv("AUTH_CLIENT_ID");
    }
    public String getClientSecret() {
        return System.getenv("AUTH_CLIENT_SECRET");
    }
    public String getDomain() {
        return System.getenv("AUTH_DOMAIN");
    }
}
