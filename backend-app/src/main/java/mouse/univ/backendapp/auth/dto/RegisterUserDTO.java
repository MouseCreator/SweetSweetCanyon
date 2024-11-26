package mouse.univ.backendapp.auth.dto;

import lombok.Data;

@Data
public class RegisterUserDTO {
    private String sub;
    private String email;
    private String name;
}
