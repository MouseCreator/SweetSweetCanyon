package mouse.univ.backendapp.dto.product;

import lombok.Data;

import java.math.BigDecimal;
@Data
public class ProductResponseDTO {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private BigDecimal deliveryPrice;
    private String pictureUrl;
}
