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
    void createShop() {
        ShopCreateDTO productCreateDTO = withShop();
        ShopResponseDTO newProduct = shopService.createShop(productCreateDTO);
        assertNotNull(newProduct);
        ShopResponseDTO productById = shopService.findShopById(newProduct.getId());
        assertEquals(productById.getId(), newProduct.getId());
    }

    private ShopCreateDTO withShop() {
        ShopCreateDTO shopCreateDTO = new ShopCreateDTO();
        shopCreateDTO.setName("New Shop");
        shopCreateDTO.setDescription("New shop's description");
        shopCreateDTO.setPictureUrl("");
        shopCreateDTO.setHours("9:00-23:00");
        shopCreateDTO.setAddress("Sweet street");
        return shopCreateDTO;
    }
    @Test
    void getShopsById() {
        ShopCreateDTO createDTO = withShop();
        ShopResponseDTO shop = shopService.createShop(createDTO);
        ShopResponseDTO byId = shopService.findShopById(shop.getId());
        assertEquals(byId.getId(), shop.getId());
    }
    @Test
    void getAllShops() {
        ShopCreateDTO shop = withShop();
        ShopResponseDTO newShop = shopService.createShop(shop);
        List<ShopResponseDTO> all = shopService.getAllShops();
        assertTrue(all.contains(newShop));
    }

    @Test
    void deleteShopById() {
        ShopCreateDTO productCreateDTO = withShop();
        ShopResponseDTO newShop = shopService.createShop(productCreateDTO);
        shopService.deleteShopById(newShop.getId(), UserDetails.asAdmin());
        List<ShopResponseDTO> allProducts = shopService.getAllShops();
        assertFalse(allProducts.contains(newShop));
    }
}