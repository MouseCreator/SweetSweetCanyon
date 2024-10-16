package mouse.univ.backendapp.controller;

import lombok.AllArgsConstructor;
import mouse.univ.backendapp.dto.product.ProductCreateDTO;
import mouse.univ.backendapp.dto.product.ProductTypesResponseDTO;
import mouse.univ.backendapp.dto.product.ProductUpdateDTO;
import mouse.univ.backendapp.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/products/")
public class ProductController {
    private final ProductService productService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public ProductTypesResponseDTO postProduct(ProductCreateDTO createDTO) {
        return productService.createProduct(createDTO);
    }

    @GetMapping
    public List<ProductTypesResponseDTO> getAllProducts() {
        return productService.getAll();
    }

    @GetMapping("/{id}")
    public ProductTypesResponseDTO getById(@PathVariable("id") long id) {
        return productService.getById(id);
    }
    @PutMapping
    public ProductTypesResponseDTO update(ProductUpdateDTO updateDTO) {
        return productService.update(updateDTO);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") long id) {
        productService.deleteById(id);
    }
}
