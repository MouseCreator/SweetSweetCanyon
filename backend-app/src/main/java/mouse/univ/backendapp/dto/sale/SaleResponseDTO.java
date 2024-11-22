package mouse.univ.backendapp.dto.sale;

import lombok.Data;
import mouse.univ.backendapp.dto.used.UsedProductResponseDTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class SaleResponseDTO {
    private Long id;
    private String type;
    private LocalDateTime date;
    private List<UsedProductResponseDTO> products;
    private String cashier;
    private BigDecimal price;
}
