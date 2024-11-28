package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.Sale;
import mouse.univ.backendapp.model.Shop;
import mouse.univ.backendapp.model.Supply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SaleRepository extends JpaRepository<Sale, Long> {
    @Query("select s from Sale s where s.transaction.id = :id")
    Optional<Sale> findByTransaction(@Param("id") Long id);
    @Query("select s from Sale s where s.transaction.date >= :begins and s.transaction.date <= :ends")
    List<Sale> findAllByDateRange(LocalDateTime begin, LocalDateTime end);

    @Query("select s " +
            "from Sale s " +
            "where s.transaction.date >= :begins " +
            "and s.transaction.date <= :ends " +
            "and s.transaction.shop.id = :shopId")
    List<Sale> findAllByDateRangeAndShop(LocalDateTime begins, LocalDateTime ends, Long shopId);
}
