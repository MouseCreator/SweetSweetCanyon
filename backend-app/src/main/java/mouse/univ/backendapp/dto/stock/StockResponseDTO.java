package mouse.univ.backendapp.dto.stock;

import lombok.Data;
import mouse.univ.backendapp.dto.product.ProductResponseDTO;

@Data
public class StockResponseDTO {
    private Long shopId;
    private ProductResponseDTO product;
    private Long amount;
}
