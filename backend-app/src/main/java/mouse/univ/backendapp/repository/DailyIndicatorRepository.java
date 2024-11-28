package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.DailyIndicator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface DailyIndicatorRepository extends JpaRepository<DailyIndicator, Long> {
    @Query("select di from DailyIndicator di " +
            "where di.productIndicator.isTotal = true " +
            "and di.date >= :start and di.date <= :end and di.type = :type")
    List<DailyIndicator> findBetweenGlobalAndType(LocalDate start, LocalDate end, String type);
    @Query("select di from DailyIndicator di " +
            "where di.productIndicator.isTotal = true " +
            "and di.date >= :start and di.date <= :end and di.type = :type and di.productIndicator.shop = :shopId")
    List<DailyIndicator> findBetweenShopAndType(LocalDate start, LocalDate end, String type, Long shopId);
}
