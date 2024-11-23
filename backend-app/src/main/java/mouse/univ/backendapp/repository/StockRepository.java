package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.Product;
import mouse.univ.backendapp.model.Shop;
import mouse.univ.backendapp.model.Stock;
import mouse.univ.backendapp.model.StockKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StockRepository extends JpaRepository<Stock, StockKey> {
    void deleteAllByShop(Shop shop);
    void deleteAllByProduct(Product product);
    List<Stock> findAllByShop(Shop shop);
    List<Stock> findAllByProduct(Product product);
    @Query("select s from Stock s where lower(s.product.name) like lower(concat('%', :name, '%') ) and s.shop.id = :shopId")
    List<Stock> findAllByNameAndShop(@Param("name") String name, @Param("shopId") Long shopId);
    @Query("select s from Stock s where lower(s.product.name) like lower(concat('%', :name, '%'))")
    List<Stock> findAllByName(@Param("name") String name);
}
