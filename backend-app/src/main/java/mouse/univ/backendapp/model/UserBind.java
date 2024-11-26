package mouse.univ.backendapp.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="user_bind")
public class UserBind {
    @Id
    private String sub;
    @JoinColumn(name = "user_id")
    @ManyToOne
    private User user;
}
