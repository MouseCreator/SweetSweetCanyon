package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.Loss;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface LossRepository extends JpaRepository<Loss, Long> {
    @Query("select s from Loss s where s.transaction.id = :id")
    Optional<Loss> findByTransaction(@Param("id") Long id);
}
