package mouse.univ.backendapp.service.history;

import lombok.AllArgsConstructor;
import mouse.univ.backendapp.service.fill.DataReadService;
import mouse.univ.backendapp.utils.DateUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class HistoryFillerService {

    private final DataReadService dataReadService;
    private final HistoryGenerator historyGenerator;
    public void fillHistory() {
        HistoryDTO historyDTO = dataReadService.readHistory("src/main/resources/fill/history.json");
        HistoryParams params = toParams(historyDTO);
        historyGenerator.generateHistory(params);
    }

    private HistoryParams toParams(HistoryDTO historyDTO) {
        HistoryParams params = new HistoryParams();
        String startDate = historyDTO.getStartDate();
        String endDate = historyDTO.getEndDate();

        LocalDateTime first = DateUtils.fromString(startDate).atStartOfDay();
        LocalDateTime end = DateUtils.fromString(endDate).atStartOfDay();
        params.setFirstDay(first);
        params.setLastDay(end);
        params.setSupplyDaily(historyDTO.getSupplyDaily());
        params.setLossDaily(historyDTO.getLossDaily());
        params.setSellDaily(historyDTO.getSellDaily());
        return params;

    }
}
