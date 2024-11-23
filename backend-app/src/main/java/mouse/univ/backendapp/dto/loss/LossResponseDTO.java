package mouse.univ.backendapp.dto.loss;

import lombok.Data;
import mouse.univ.backendapp.dto.used.UsedProductResponseDTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class LossResponseDTO {
    private Long id;
    private String type;
    private LocalDateTime date;
    private List<UsedProductResponseDTO> usedProducts;
    private BigDecimal price;
    private String cashier;
    private LossReasonResponseDTO reason;
    private String comment;
}
