package mouse.univ.backendapp.service;

import mouse.univ.backendapp.dto.product.ProductCreateDTO;
import mouse.univ.backendapp.dto.product.ProductResponseDTO;
import mouse.univ.backendapp.dto.user.UserDetails;
import mouse.univ.backendapp.framework.DatabaseTestFiller;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestExecutionListeners;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@TestExecutionListeners(
        listeners = {DatabaseTestFiller.class}, mergeMode = TestExecutionListeners.MergeMode.MERGE_WITH_DEFAULTS)
class ProductServiceTest {
    @Autowired
    private ProductService productService;
    @Test
    void createProduct() {
        ProductCreateDTO productCreateDTO = withProduct();
        ProductResponseDTO newProduct = productService.createProduct(productCreateDTO);
        assertNotNull(newProduct);
        ProductResponseDTO productById = productService.findProductById(newProduct.getId());
        assertEquals(productById.getId(), newProduct.getId());
    }

    private ProductCreateDTO withProduct() {
        ProductCreateDTO productCreateDTO = new ProductCreateDTO();
        productCreateDTO.setName("New Product");
        productCreateDTO.setPrice(new BigDecimal("12.00"));
        productCreateDTO.setDeliveryPrice(new BigDecimal("9.00"));
        productCreateDTO.setDescription("New product's description");
        productCreateDTO.setPictureUrl("");
        return productCreateDTO;
    }
    @Test
    void getProductById() {
        ProductCreateDTO productCreateDTO = withProduct();
        ProductResponseDTO newProduct = productService.createProduct(productCreateDTO);
        ProductResponseDTO productById = productService.findProductById(newProduct.getId());
        assertEquals(productById.getId(), newProduct.getId());
    }
    @Test
    void getAllProducts() {
        ProductCreateDTO productCreateDTO = withProduct();
        ProductResponseDTO newProduct = productService.createProduct(productCreateDTO);
        List<ProductResponseDTO> allProducts = productService.getAllProducts();
        assertTrue(allProducts.contains(newProduct));
    }

    @Test
    void deleteProductById() {
        ProductCreateDTO productCreateDTO = withProduct();
        ProductResponseDTO newProduct = productService.createProduct(productCreateDTO);
        productService.deleteProductById(newProduct.getId(), UserDetails.asAdmin());
        List<ProductResponseDTO> allProducts = productService.getAllProducts();
        assertFalse(allProducts.contains(newProduct));
    }
}