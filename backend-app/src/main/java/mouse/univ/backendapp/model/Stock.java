package mouse.univ.backendapp.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "stocks")
@Data
public class Stock {
    @EmbeddedId
    private StockKey id;
    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name="product_id")
    private Product product;

    @ManyToOne
    @MapsId("shopId")
    @JoinColumn(name="shop_id")
    private Shop shop;
    private Long amount;

}
