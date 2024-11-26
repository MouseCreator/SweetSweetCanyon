package mouse.univ.backendapp.auth.fetch;

import lombok.AllArgsConstructor;
import mouse.univ.backendapp.auth.fetch.data.KeysHolder;
import mouse.univ.backendapp.auth.fetch.data.ResponseHolder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
@Service
@AllArgsConstructor
public class FetchAccessToken {

    private final SecretsProvider secretsProvider;
    public ResponseHolder fetch() {
        RestTemplate restTemplate = new RestTemplate();
        String secret = secretsProvider.getClientSecret();
        String domain = secretsProvider.getDomain();
        String clientId = secretsProvider.getClientId();
        String url = "https://" + domain + "/oauth/token";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> body = new HashMap<>();

        body.put("client_id", clientId);
        body.put("client_secret", secret);
        body.put("audience", "https://" + domain + "/api/v2/");
        body.put("grant_type", "client_credentials");

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);

        return restTemplate.postForEntity(url, entity, ResponseHolder.class).getBody();
    }
}
