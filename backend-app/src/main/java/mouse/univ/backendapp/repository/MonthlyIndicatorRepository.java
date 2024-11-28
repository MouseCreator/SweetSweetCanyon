package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.MonthlyIndicator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface MonthlyIndicatorRepository extends JpaRepository<MonthlyIndicator, Long> {

    @Query("select mi from MonthlyIndicator mi " +
            "where mi.productIndicator.isTotal = true " +
            "and mi.date >= :start and mi.date <= :end and mi.type = :type")
    List<MonthlyIndicator> findBetweenGlobalAndType(LocalDate start, LocalDate end, String type);
    @Query("select mi from MonthlyIndicator mi " +
            "where mi.date >= :start and mi.date <= :end and mi.type = :type and mi.productIndicator.shop.id = :shopId")
    List<MonthlyIndicator> findBetweenShopAndType(LocalDate start, LocalDate end, String type, Long shopId);
}
