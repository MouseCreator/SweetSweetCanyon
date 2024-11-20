package mouse.univ.backendapp.components;

import java.util.List;

public interface FileManager {
    List<String> readLines(String filename);
    String read(String filename);
    void write(String filename, String content);
    void append(String filename, String content);

}
