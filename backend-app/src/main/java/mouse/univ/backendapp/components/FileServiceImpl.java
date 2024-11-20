package mouse.univ.backendapp.components;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {
    private final FileManager fileManager;
    @Override
    public List<String> readLinedFile(String filename) {
        List<String> lines = fileManager.readLines(filename);
        List<String> result = new ArrayList<>();
        for (String line : lines) {
            String trimmed = line.trim();
            if (trimmed.isEmpty())
                continue;
            result.add(trimmed);
        }
        return result;
    }

    @Override
    public Map<String, String> readPropertiesFile(String filename) {
        List<String> lines = fileManager.readLines(filename);
        Map<String, String> result = new HashMap<>();
        for (String line : lines) {
            if (!line.contains("="))
                continue;
            String[] split = line.split("=", 2);
            String key = split[0].trim();
            String value = split[1].trim();
            result.put(key, value);;
        }
        return result;
    }
}
