package mouse.univ.backendapp.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime date;
    private BigDecimal price;
    private String username;
    @JoinColumn(name = "shop_id")
    @ManyToOne
    private Shop shop;
    @OneToMany(fetch = FetchType.EAGER)
    @JoinTable(name="transaction_products",
            joinColumns = @JoinColumn(name = "transaction_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id"))
    private List<UsedProduct> usedProductList;

    public boolean isEmpty() {
        return price.compareTo(BigDecimal.ZERO) == 0;
    }
}
