package mouse.univ.backendapp.dto.product;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductUpdateDTO {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private BigDecimal deliveryPrice;
    private String pictureUrl;
}
