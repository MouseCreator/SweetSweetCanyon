package mouse.univ.backendapp.service.fill;

import com.fasterxml.jackson.databind.ObjectMapper;
import mouse.univ.backendapp.exception.JSONException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JSONService {
    private final ObjectMapper objectMapper;
    public JSONService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public <T> List<T> readListOfItems(String jsonString, Class<T> expectedClass) {
        try {
            return objectMapper.readValue(
                    jsonString,
                    objectMapper.getTypeFactory().constructCollectionType(List.class, expectedClass)
            );
        } catch (Exception e) {
            throw new JSONException("Failed to parse JSON", e);
        }
    }
}
