package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.Shop;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShopRepository extends JpaRepository<Shop, Long> {
}
