package mouse.univ.backendapp.service.history;

import lombok.Data;

@Data
public class HistoryDTO {
    private String startDate;
    private String endDate;
    private Long sellDaily;
    private Long lossDaily;
    private Long supplyDaily;
}
