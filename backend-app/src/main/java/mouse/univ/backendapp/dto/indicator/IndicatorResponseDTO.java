package mouse.univ.backendapp.dto.indicator;

import lombok.Data;

import java.util.List;
@Data
public class IndicatorResponseDTO {
    public List<DateIndicatorDTO> detailsList;
    public List<StaticIndicatorDTO> staticList;
}
