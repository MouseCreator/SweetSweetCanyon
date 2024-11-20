package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.TransactionProduct;
import mouse.univ.backendapp.model.TransactionProductKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionProductRepository extends JpaRepository<TransactionProduct, TransactionProductKey> {
}
