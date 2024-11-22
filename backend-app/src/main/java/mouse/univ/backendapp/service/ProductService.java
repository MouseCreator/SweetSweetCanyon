package mouse.univ.backendapp.service;


import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import mouse.univ.backendapp.dto.product.ProductCreateDTO;
import mouse.univ.backendapp.dto.product.ProductResponseDTO;
import mouse.univ.backendapp.dto.product.ProductUpdateDTO;
import mouse.univ.backendapp.exception.DataNotFoundException;
import mouse.univ.backendapp.exception.UpdateBadRequestException;
import mouse.univ.backendapp.exception.UpdateNotFoundException;
import mouse.univ.backendapp.mapper.ProductMapper;
import mouse.univ.backendapp.model.Product;
import mouse.univ.backendapp.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper mapper;
    @Transactional
    public ProductResponseDTO createProduct(ProductCreateDTO productCreateDTO) {
        Product product = mapper.fromCreateDTO(productCreateDTO);
        Product saved = productRepository.save(product);
        return mapper.toResponseDTO(saved);
    }

    public List<ProductResponseDTO> getAllProducts() {
        List<Product> all = productRepository.getProductsByOrderByIdAsc();
        return all.stream().map(mapper::toResponseDTO).toList();
    }
    public ProductResponseDTO findProductById(Long id) {
        Optional<Product> byId = productRepository.findById(id);
        Product product = byId.orElseThrow(() -> new DataNotFoundException("Cannot find product by id:" + id));
        return mapper.toResponseDTO(product);
    }
    @Transactional
    public ProductResponseDTO updateProduct(ProductUpdateDTO updateDTO) {
        Product product = mapper.fromUpdateDTO(updateDTO);
        Long id = product.getId();
        if (id == null) {
            throw new UpdateBadRequestException("Cannot update product, product has no id");
        }
        boolean exists = productRepository.existsById(id);
        if (!exists) {
            throw new UpdateNotFoundException("Cannot update product. No product found by id: " + id);
        }
        Product updated = productRepository.save(product);
        return mapper.toResponseDTO(updated);
    }

    public List<ProductResponseDTO> findProductsByName(String searchString) {
        List<Product> productsByName = productRepository.getProductsByNameIgnoreCase(searchString);
        return productsByName.stream().map(mapper::toResponseDTO).toList();
    }

    public void deleteProductById(Long id) {
        productRepository.deleteById(id);
    }

    public boolean existsByName(String name) {
        return productRepository.existsByName(name);
    }
}
