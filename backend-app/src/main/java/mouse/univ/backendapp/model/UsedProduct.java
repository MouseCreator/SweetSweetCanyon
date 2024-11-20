package mouse.univ.backendapp.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "used_products")
public class UsedProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private BigDecimal price;
    private Long amount;
    @ManyToOne
    @JoinColumn(name = "reference")
    private Product reference;
}
