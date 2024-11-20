package mouse.univ.backendapp.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "product_indicators")
public class ProductIndicator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime date;
    private String type;
    @ManyToOne
    @JoinColumn(name = "shopId")
    private Shop shop;
    private Boolean isTotal;
    private Long value;
    private BigDecimal price;
}
