package mouse.univ.backendapp.service.indicator;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class IndicatorFillService {
    private IndicatorService indicatorService;

    public void fill() {
        LocalDateTime minDate = LocalDate.of(2024, 6, 1).atStartOfDay();
        LocalDateTime now = LocalDateTime.now();
        indicatorService.pointerRoutine(now, minDate);
    }
}
