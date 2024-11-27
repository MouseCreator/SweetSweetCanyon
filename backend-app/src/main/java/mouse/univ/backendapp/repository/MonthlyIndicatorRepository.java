package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.MonthlyIndicator;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface MonthlyIndicatorRepository extends JpaRepository<MonthlyIndicator, Long> {
    boolean existsByDate(LocalDate date);
}
