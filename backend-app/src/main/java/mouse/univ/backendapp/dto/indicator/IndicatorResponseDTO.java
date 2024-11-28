package mouse.univ.backendapp.dto.indicator;

import lombok.Data;

import java.util.List;
@Data
public class IndicatorResponseDTO {
    private String requestType;
    public List<DateIndicatorDTO> detailsList;
    public List<StaticIndicatorDTO> staticList;
}
