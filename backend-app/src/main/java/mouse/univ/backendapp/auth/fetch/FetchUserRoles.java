package mouse.univ.backendapp.auth.fetch;

import lombok.AllArgsConstructor;
import mouse.univ.backendapp.auth.fetch.data.ResponseHolder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@AllArgsConstructor
public class FetchUserRoles {

    private FetchAccessToken fetchAccessToken;
    private SecretsProvider secretsProvider;
    public String fetch(String userId) {
        RestTemplate restTemplate = new RestTemplate();
        ResponseHolder holder = fetchAccessToken.fetch();
        String getRolesUrl = "https://" + secretsProvider.getDomain() + "/api/v2/users/" + userId + "/roles";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(holder.getAccessToken());

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<String> rolesResponse = restTemplate.exchange(
                getRolesUrl,
                HttpMethod.GET,
                entity,
                String.class,
                userId
        );
        return rolesResponse.getBody();
    }
}
