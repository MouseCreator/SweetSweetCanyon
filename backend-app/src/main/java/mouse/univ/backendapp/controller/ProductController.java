package mouse.univ.backendapp.controller;

import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.api.ApiResponse;
import mouse.univ.backendapp.dto.product.ProductCreateDTO;
import mouse.univ.backendapp.dto.product.ProductResponseDTO;
import mouse.univ.backendapp.dto.product.ProductUpdateDTO;
import mouse.univ.backendapp.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/products")
public class ProductController {
    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ApiResponse<ProductResponseDTO>> postProduct(@RequestBody ProductCreateDTO productCreateDTO) {
        ProductResponseDTO result = productService.createProduct(productCreateDTO);
        ApiResponse<ProductResponseDTO> apiResponse = ApiResponse.ok(result);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @PutMapping
    public ResponseEntity<ApiResponse<ProductResponseDTO>> updateProduct(@RequestBody ProductUpdateDTO updateDTO) {
        ProductResponseDTO result = productService.updateProduct(updateDTO);
        ApiResponse<ProductResponseDTO> apiResponse = ApiResponse.ok(result);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductResponseDTO>>> getAllProducts() {
        List<ProductResponseDTO> result = productService.getAllProducts();
        ApiResponse<List<ProductResponseDTO>> apiResponse = ApiResponse.ok(result);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponseDTO>> getAllProducts(@PathVariable Long id) {
        ProductResponseDTO result = productService.findProductById(id);
        ApiResponse<ProductResponseDTO> apiResponse = ApiResponse.ok(result);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<ProductResponseDTO>>> getProductsByName(@RequestParam("name") String name) {
        List<ProductResponseDTO> productsByName = productService.findProductsByName(name);
        ApiResponse<List<ProductResponseDTO>> apiResponse = ApiResponse.ok(productsByName);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

}
