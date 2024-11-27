package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.DailyIndicator;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface DailyIndicatorRepository extends JpaRepository<DailyIndicator, Long> {
    boolean existsByDate(LocalDate date);
}
