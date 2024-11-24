package mouse.univ.backendapp.dto.movement;

import lombok.Data;
import mouse.univ.backendapp.dto.shop.ShopResponseDTO;
import mouse.univ.backendapp.dto.used.UsedProductResponseDTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class MovementResponseDTO {
    private Long id;
    private String type;
    private LocalDateTime date;
    private List<UsedProductResponseDTO> products;
    private BigDecimal price;
    private String cashier;
    private ShopResponseDTO shop;
    private ShopResponseDTO toShop;

}
