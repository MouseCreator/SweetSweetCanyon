package mouse.univ.backendapp.dto.user;

import lombok.Data;

@Data
public class UserUpdateDTO {
    private Long id;
    private String name;
    private String phone;
    private String email;
    private Long shopId;
}
