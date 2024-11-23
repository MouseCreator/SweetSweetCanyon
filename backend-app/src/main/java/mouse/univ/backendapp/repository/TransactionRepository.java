package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query("select count(t) from Transaction t where t.shop.id = :shopId and t.type = :type")
    Integer countAllByShopAndType(@Param("shopId") Long shopId, @Param("type") String type);
    @Query("select count(t) from Transaction t where t.shop.id = :shopId ")
    Integer countAllByShop(@Param("shopId") Long shopId);
    @Query("select count(t) from Transaction t where t.type = :type")
    Integer countAllByType(@Param("type") String type);
    @Query("select count(t) from Transaction t")
    Integer countAll();
    @Query("select t from Transaction t where t.shop.id = :shopId and t.type = :type")
    Page<Transaction> findAllByShopAndType(@Param("shopId") Long shopId, @Param("type") String type, @NonNull Pageable pageable);
    @Query("select t from Transaction t where t.shop.id = :shopId ")
    Page<Transaction> findAllByShop(@Param("shopId") Long shopId, @NonNull Pageable pageable);
    @Query("select t from Transaction t where t.type = :type")
    Page<Transaction> findAllByType(@Param("type") String type, @NonNull Pageable pageable);
    @Query("select t from Transaction t")
    Page<Transaction> findAllByPage(@NonNull Pageable pageable);
}
