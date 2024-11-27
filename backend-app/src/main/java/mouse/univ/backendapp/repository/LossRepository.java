package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.Loss;
import mouse.univ.backendapp.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface LossRepository extends JpaRepository<Loss, Long> {
    @Query("select s from Loss s where s.transaction.id = :id")
    Optional<Loss> findByTransaction(@Param("id") Long id);
    @Query("select s from Loss s where s.transaction.date > :begins and s.transaction.date < :ends")
    List<Loss> findAllByDateRange(LocalDateTime begin, LocalDateTime end);

    @Query("select s " +
            "from Loss s " +
            "where s.transaction.date > :begins " +
            "and s.transaction.date < :ends " +
            "and s.transaction.shop.id = :shopId")
    List<Loss> findAllByDateRangeAndShop(LocalDateTime begins, LocalDateTime ends, Long shopId);
}
