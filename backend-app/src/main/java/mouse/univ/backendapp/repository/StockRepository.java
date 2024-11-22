package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.Product;
import mouse.univ.backendapp.model.Shop;
import mouse.univ.backendapp.model.Stock;
import mouse.univ.backendapp.model.StockKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StockRepository extends JpaRepository<Stock, StockKey> {
    void deleteAllByShop(Shop shop);
    void deleteAllByProduct(Product product);
    List<Stock> findAllByShop(Shop shop);
    List<Stock> findAllByProduct(Product product);
}
