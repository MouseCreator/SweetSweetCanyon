package mouse.univ.backendapp.dto.transaction;

import lombok.Data;
import mouse.univ.backendapp.dto.shop.ShopResponseDTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class TransactionShortResponseDTO {
    private Long id;
    private Long transactionId;
    private String type;
    private BigDecimal price;
    private LocalDateTime date;
    private ShopResponseDTO shop;
    private String cashier;
}
