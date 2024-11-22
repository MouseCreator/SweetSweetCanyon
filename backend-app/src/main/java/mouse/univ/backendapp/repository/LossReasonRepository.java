package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.LossReason;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LossReasonRepository extends JpaRepository<LossReason, Long> {
    Optional<LossReason> findByTitle(String title);
}
