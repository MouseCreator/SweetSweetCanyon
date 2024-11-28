package mouse.univ.backendapp.dto.indicator;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class StaticIndicatorDTO {
    private Long value;
    private BigDecimal price;
    private boolean isTotal;
    private String shopName;
}
