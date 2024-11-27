package mouse.univ.backendapp.service.history;

import lombok.AllArgsConstructor;
import mouse.univ.backendapp.service.fill.DataReadService;
import mouse.univ.backendapp.service.fill.JSONService;
import mouse.univ.backendapp.service.indicator.IndicatorService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class HistoryFillerService {

    private final DataReadService dataReadService;
    private final HistoryGenerator historyGenerator;
    private final IndicatorService indicatorService;
    public void fillHistory() {
        HistoryDTO historyDTO = dataReadService.readHistory("src/main/resources/fill/history.json");
        HistoryParams params = toParams(historyDTO);
        historyGenerator.generateHistory(params);
    }

    private HistoryParams toParams(HistoryDTO historyDTO) {
        HistoryParams params = new HistoryParams();
        String startDate = historyDTO.getStartDate();
        String endDate = historyDTO.getEndDate();

        LocalDateTime first = LocalDate.parse(startDate).atStartOfDay();
        LocalDateTime end = LocalDate.parse(endDate).atStartOfDay();
        params.setFirstDay(first);
        params.setLastDay(end);
        params.setSupplyDaily(historyDTO.getSupplyDaily());
        params.setLossDaily(historyDTO.getLossDaily());
        params.setSellDaily(historyDTO.getSellDaily());
        return params;

    }
}
