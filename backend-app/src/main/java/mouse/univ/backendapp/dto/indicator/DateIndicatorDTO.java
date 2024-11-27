package mouse.univ.backendapp.dto.indicator;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class DateIndicatorDTO {
    private LocalDate localDate;
    private Long value;
    private BigDecimal price;
}
