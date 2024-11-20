package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.Loss;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LossReasonRepository extends JpaRepository<Loss, String> {
}
