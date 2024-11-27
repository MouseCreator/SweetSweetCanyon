package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.Supply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SupplyRepository extends JpaRepository<Supply, Long> {
    @Query("select s from Supply s where s.transaction.id = :id")
    Optional<Supply> findByTransaction(@Param("id") Long id);
    @Query("select s from Supply s where s.transaction.date > :begins and s.transaction.date < :ends")
    List<Supply> findAllByDateRange(LocalDateTime begins, LocalDateTime ends);

    @Query("select s " +
            "from Supply s " +
            "where s.transaction.date > :begins " +
            "and s.transaction.date < :ends " +
            "and s.transaction.shop.id = :shopId")
    List<Supply> findAllByDateRangeAndShop(LocalDateTime begins, LocalDateTime ends, Long shopId);
}
