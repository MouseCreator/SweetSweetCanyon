package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.Product;
import mouse.univ.backendapp.model.Type;

import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> getProductsByTypes(List<Type> types);
}
