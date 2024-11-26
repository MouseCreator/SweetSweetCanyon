package mouse.univ.backendapp.auth.fetch;

import lombok.AllArgsConstructor;
import mouse.univ.backendapp.auth.dto.UserInfoHolder;
import mouse.univ.backendapp.exception.NotAuthenticatedException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@AllArgsConstructor
public class FetchUserInfo {
    private SecretsProvider secretsProvider;
    private FetchAccessToken fetchAccessToken;
    public UserInfoHolder fetch(String accessToken) {
        if (accessToken == null || accessToken.isEmpty()) {
            throw new NotAuthenticatedException("Access token is empty");
        }
        RestTemplate restTemplate = new RestTemplate();
        String getRolesUrl = "https://" + secretsProvider.getDomain() + "/userinfo";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<UserInfoHolder> rolesResponse = restTemplate.getForEntity(
                getRolesUrl,
                UserInfoHolder.class,
                entity
        );
        return rolesResponse.getBody();
    }
}
