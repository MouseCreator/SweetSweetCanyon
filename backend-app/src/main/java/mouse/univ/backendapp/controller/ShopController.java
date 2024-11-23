package mouse.univ.backendapp.controller;

import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.api.ApiResponse;
import mouse.univ.backendapp.dto.shop.ShopCreateDTO;
import mouse.univ.backendapp.dto.shop.ShopResponseDTO;
import mouse.univ.backendapp.dto.shop.ShopUpdateDTO;
import mouse.univ.backendapp.dto.user.UserDetails;
import mouse.univ.backendapp.service.ShopService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/shops")
public class ShopController {
    private final ShopService shopService;

    @PostMapping
    public ResponseEntity<ApiResponse<ShopResponseDTO>> postProduct(@RequestBody ShopCreateDTO shopCreateDTO) {
        ShopResponseDTO result = shopService.createShop(shopCreateDTO);
        ApiResponse<ShopResponseDTO> apiResponse = ApiResponse.ok(result);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @PutMapping
    public ResponseEntity<ApiResponse<ShopResponseDTO>> updateProduct(@RequestBody ShopUpdateDTO shopUpdateDTO) {
        ShopResponseDTO result = shopService.updateShop(shopUpdateDTO);
        ApiResponse<ShopResponseDTO> apiResponse = ApiResponse.ok(result);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    @GetMapping
    public ResponseEntity<ApiResponse<List<ShopResponseDTO>>> getAllProducts() {
        List<ShopResponseDTO> result = shopService.getAllShops();
        ApiResponse<List<ShopResponseDTO>> apiResponse = ApiResponse.ok(result);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ShopResponseDTO>> getAllProducts(@PathVariable Long id) {
        ShopResponseDTO result = shopService.findShopById(id);
        ApiResponse<ShopResponseDTO> apiResponse = ApiResponse.ok(result);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteProductById(@PathVariable Long id) {
        UserDetails userDetails = UserDetails.asAdmin();
        shopService.deleteShopById(id, userDetails);
        ApiResponse<Object> apiResponse = ApiResponse.ok(null);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
