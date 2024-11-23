package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SaleRepository extends JpaRepository<Sale, Long> {
    @Query("select s from Sale s where s.transaction.id = :id")
    Optional<Sale> findByTransaction(@Param("id") Long id);
}
