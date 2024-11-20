package mouse.univ.backendapp.components;

import java.util.List;
import java.util.Map;

public interface FileService {
    List<String> readLinedFile(String filename);
    Map<String, String> readPropertiesFile(String filename);
}
