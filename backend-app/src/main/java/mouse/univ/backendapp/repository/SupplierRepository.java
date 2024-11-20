package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
}
