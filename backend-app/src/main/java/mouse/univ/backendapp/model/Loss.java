package mouse.univ.backendapp.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "losses")
public class Loss {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "transaction_id")
    private Transaction transaction;

    @ManyToOne
    private LossReason reason;
    @Column(name = "comment")
    private String comment;
}
