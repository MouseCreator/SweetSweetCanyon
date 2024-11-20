package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.UsedProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsedProductRepository extends JpaRepository<UsedProduct, Long> {
}
