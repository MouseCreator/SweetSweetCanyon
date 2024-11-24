package mouse.univ.backendapp.service.history;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class HistoryParams {
    private LocalDateTime firstDay;
    private LocalDateTime lastDay;
    private Long sellDaily;
    private Long lossDaily;
    private Long supplyDaily;
}
