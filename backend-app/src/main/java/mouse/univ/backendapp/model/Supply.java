package mouse.univ.backendapp.model;

import jakarta.persistence.*;
import lombok.Data;
import mouse.univ.backendapp.model.prototype.TransactionHolder;

@Data
@Entity
@Table(name = "supplies")
public class Supply implements TransactionHolder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "transaction_id")
    private Transaction transaction;

    @Column(name="supplier_name")
    private String supplierName;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;
}
