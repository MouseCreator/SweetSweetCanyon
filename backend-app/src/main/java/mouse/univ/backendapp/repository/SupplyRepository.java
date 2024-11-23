package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.Supply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SupplyRepository extends JpaRepository<Supply, Long> {
    @Query("select s from Supply s where s.transaction.id = :id")
    Optional<Supply> findByTransaction(@Param("id") Long id);
}
