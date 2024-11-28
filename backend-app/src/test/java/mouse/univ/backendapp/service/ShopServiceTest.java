package mouse.univ.backendapp.service;

import mouse.univ.backendapp.dto.shop.ShopCreateDTO;
import mouse.univ.backendapp.dto.shop.ShopResponseDTO;
import mouse.univ.backendapp.dto.user.UserDetails;
import mouse.univ.backendapp.framework.DatabaseTestFiller;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestExecutionListeners;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@TestExecutionListeners(
        listeners = {DatabaseTestFiller.class}, mergeMode = TestExecutionListeners.MergeMode.MERGE_WITH_DEFAULTS)
class ShopServiceTest {

    @Autowired
    private ShopService shopService;
    @Test
    void createProduct() {
        ShopCreateDTO productCreateDTO = withShop();
        ShopResponseDTO newProduct = shopService.createShop(productCreateDTO);
        assertNotNull(newProduct);
        ShopResponseDTO productById = shopService.findShopById(newProduct.getId());
        assertEquals(productById.getId(), newProduct.getId());
    }

    private ShopCreateDTO withShop() {
        ShopCreateDTO shopCreateDTO = new ShopCreateDTO();
        shopCreateDTO.setName("New Product");
        shopCreateDTO.setDescription("New product's description");
        shopCreateDTO.setPictureUrl("");
        return shopCreateDTO;
    }
    @Test
    void getProductById() {
        ShopCreateDTO productCreateDTO = withShop();
        ShopResponseDTO newProduct = shopService.createShop(productCreateDTO);
        ShopResponseDTO productById = shopService.findShopById(newProduct.getId());
        assertEquals(productById.getId(), newProduct.getId());
    }
    @Test
    void getAllProducts() {
        ShopCreateDTO productCreateDTO = withShop();
        ShopResponseDTO newProduct = shopService.createShop(productCreateDTO);
        List<ShopResponseDTO> allProducts = shopService.getAllShops();
        assertTrue(allProducts.contains(newProduct));
    }

    @Test
    void deleteProductById() {
        ShopCreateDTO productCreateDTO = withShop();
        ShopResponseDTO newProduct = shopService.createShop(productCreateDTO);
        shopService.deleteShopById(newProduct.getId(), UserDetails.asAdmin());
        List<ShopResponseDTO> allProducts = shopService.getAllShops();
        assertFalse(allProducts.contains(newProduct));
    }
}