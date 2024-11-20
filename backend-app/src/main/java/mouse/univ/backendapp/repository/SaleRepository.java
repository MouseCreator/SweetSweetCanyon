package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale, Long> {
}
