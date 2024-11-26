package mouse.univ.backendapp.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "contacts")
public class UserContacts {
    @Id
    private Long id;
    private String phone;
    private String email;
    private Long shopId;
}
