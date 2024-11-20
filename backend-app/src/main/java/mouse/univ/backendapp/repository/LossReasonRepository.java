package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.LossReason;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LossReasonRepository extends JpaRepository<LossReason, Long> {
}
