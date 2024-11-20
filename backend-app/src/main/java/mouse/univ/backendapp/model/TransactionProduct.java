package mouse.univ.backendapp.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "transaction_products")
public class TransactionProduct {
    @EmbeddedId
    private TransactionProductKey id;

    @ManyToOne
    @MapsId("transactionId")
    @JoinColumn(name = "transaction_id")
    private Transaction transaction;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;
}
