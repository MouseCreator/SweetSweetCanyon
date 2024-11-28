package mouse.univ.backendapp.dto.indicator;

import lombok.Data;

@Data
public class IndicatorRequestDTO {
    private String startDate;
    private String endDate;
    private String type;
}
