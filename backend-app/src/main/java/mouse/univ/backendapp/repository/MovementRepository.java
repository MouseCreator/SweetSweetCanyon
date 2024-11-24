package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.Movement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MovementRepository extends JpaRepository<Movement, Long> {
    @Query("select m from Movement m where m.transaction.id = :id")
    Optional<Movement> findByTransaction(@Param("id") Long id);
}
