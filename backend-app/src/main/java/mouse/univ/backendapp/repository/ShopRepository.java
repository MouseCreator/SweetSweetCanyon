package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.Shop;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShopRepository extends JpaRepository<Shop, Long> {
    List<Shop> findAllByOrderByIdAsc();
    boolean existsByName(String name);
}
