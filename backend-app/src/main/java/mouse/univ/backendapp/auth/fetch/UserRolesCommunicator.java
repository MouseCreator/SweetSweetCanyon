package mouse.univ.backendapp.auth.fetch;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import mouse.univ.backendapp.auth.fetch.data.ResponseHolder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
@AllArgsConstructor
@Log4j2
public class UserRolesCommunicator {

    private FetchAccessToken fetchAccessToken;
    private SecretsProvider secretsProvider;
    public String fetch(String userId) {
        RestTemplate restTemplate = new RestTemplate();
        ResponseHolder holder = fetchAccessToken.fetch();
        String getRolesUrl = "https://" + secretsProvider.getDomain() + "/api/v2/users/" + userId + "/roles";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(holder.getAccessToken());

        HttpEntity<Void> entity = new HttpEntity<>(headers);
        try {
            ResponseEntity<String> rolesResponse = restTemplate.exchange(
                    getRolesUrl,
                    HttpMethod.GET,
                    entity,
                    String.class,
                    userId
            );
            return rolesResponse.getBody();
        } catch (Exception e) {
            log.debug(e.getMessage());
            return null;
        }
    }

    public String post(String userId, String roleId) {
        String domain = secretsProvider.getDomain();
        String accessToken = fetchAccessToken.fetch().getAccessToken();
        String url = "https://" + domain + "/api/v2/users/" + userId + "/roles";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.set("Content-Type", "application/json");


        Map<String, Object> body = new HashMap<>();
        body.put("roles", Collections.singletonList(roleId));

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                requestEntity,
                String.class
        );
        return response.getBody();
    }

    public String delete(String userId, String roleId) {
        String domain = secretsProvider.getDomain();
        String accessToken = fetchAccessToken.fetch().getAccessToken();
        String url = "https://" + domain + "/api/v2/users/" + userId + "/roles";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.set("Content-Type", "application/json");


        Map<String, Object> body = new HashMap<>();
        body.put("roles", Collections.singletonList(roleId));

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.DELETE,
                requestEntity,
                String.class
        );
        return response.getBody();
    }

    public String decode(String jsonString) throws Exception {
        if (jsonString == null) {
            return null;
        }
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(jsonString);
        if (rootNode.isArray() && !rootNode.isEmpty()) {
            JsonNode firstElement = rootNode.get(0);
            String roleId = firstElement.has("name") ? firstElement.get("name").asText() : null;
            if (roleId == null) {
                return null;
            }
            return roleId.toLowerCase();
        }
        return null;
    }
}
