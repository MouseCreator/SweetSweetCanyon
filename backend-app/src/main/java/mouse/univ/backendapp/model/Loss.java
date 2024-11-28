package mouse.univ.backendapp.model;

import jakarta.persistence.*;
import lombok.Data;
import mouse.univ.backendapp.model.prototype.TransactionHolder;

@Data
@Entity
@Table(name = "losses")
public class Loss implements TransactionHolder {
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
