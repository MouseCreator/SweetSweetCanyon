package mouse.univ.backendapp.auth.fetch.data;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ResponseHolder {
    @JsonProperty("access_token")
    private String accessToken;
}
