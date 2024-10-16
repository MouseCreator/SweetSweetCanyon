package mouse.univ.backendapp.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import mouse.univ.backendapp.dto.product.ProductCreateDTO;
import mouse.univ.backendapp.dto.product.ProductTypesResponseDTO;
import mouse.univ.backendapp.dto.product.ProductUpdateDTO;
import mouse.univ.backendapp.exception.EntityNotFoundException;
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
    public ProductTypesResponseDTO createProduct(ProductCreateDTO productCreateDTO) {
        Product product = mapper.productFromCreateDTO(productCreateDTO);
        Product savedProduct = productRepository.save(product);
        return mapper.toResponseDTOWithTypes(savedProduct);
    }

    public List<ProductTypesResponseDTO> getAll() {
        List<Product> all = productRepository.findAll();
        return all.stream().map(mapper::toResponseDTOWithTypes).toList();
    }

    public ProductTypesResponseDTO getById(Long id) {
        Optional<Product> productByIdOpt = productRepository.findById(id);
        Product product = productByIdOpt.orElseThrow(() -> new EntityNotFoundException("No product found by id: " + id));
        return mapper.toResponseDTOWithTypes(product);
    }
    public boolean existsById(Long id) {
        return productRepository.existsById(id);
    }
    @Transactional
    public ProductTypesResponseDTO update(ProductUpdateDTO updateDTO) {
        Product product = mapper.productFromUpdateDTO(updateDTO);
        Long id = product.getId();
        if (!existsById(id)) {
            throw new EntityNotFoundException("Cannot update product, no such id: " + id);
        }
        Product savedProduct = productRepository.save(product);
        return mapper.toResponseDTOWithTypes(savedProduct);
    }

    @Transactional
    public void deleteById(Long id) {
        if (!existsById(id)) {
            throw new EntityNotFoundException("Cannot delete product, no such id: " + id);
        }
        productRepository.deleteById(id);
    }
}
