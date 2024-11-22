package mouse.univ.backendapp.dto.used;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class UsedProductResponseDTO {
    private Long id;
    private String name;
    private BigDecimal price;
    private Long amount;
}
