package mouse.univ.backendapp.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "sales")
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "transaction_id")
    private Transaction transaction;
}
