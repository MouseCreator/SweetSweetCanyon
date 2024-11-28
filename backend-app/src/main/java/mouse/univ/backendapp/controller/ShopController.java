package mouse.univ.backendapp.controller;

import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.api.ApiResponse;
import mouse.univ.backendapp.auth.controller.UD;
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
    public ResponseEntity<ApiResponse<ShopResponseDTO>> postShop(@RequestBody ShopCreateDTO shopCreateDTO, @RequestAttribute("user") UserDetails userDetails) {
        UD.validateAdmin(userDetails);
        ShopResponseDTO result = shopService.createShop(shopCreateDTO);
        ApiResponse<ShopResponseDTO> apiResponse = ApiResponse.ok(result);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @PutMapping
    public ResponseEntity<ApiResponse<ShopResponseDTO>> updateShop(@RequestBody ShopUpdateDTO shopUpdateDTO, @RequestAttribute("user") UserDetails userDetails) {
        UD.validateAdmin(userDetails);
        ShopResponseDTO result = shopService.updateShop(shopUpdateDTO);
        ApiResponse<ShopResponseDTO> apiResponse = ApiResponse.ok(result);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    @GetMapping
    public ResponseEntity<ApiResponse<List<ShopResponseDTO>>> getAllShops() {
        List<ShopResponseDTO> result = shopService.getAllShops();
        ApiResponse<List<ShopResponseDTO>> apiResponse = ApiResponse.ok(result);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ShopResponseDTO>> getAllShops(@PathVariable Long id) {
        ShopResponseDTO result = shopService.findShopById(id);
        ApiResponse<ShopResponseDTO> apiResponse = ApiResponse.ok(result);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteShopById(@PathVariable Long id, @RequestAttribute("user") UserDetails userDetails) {
        UD.validateAdmin(userDetails);
        shopService.deleteShopById(id, userDetails);
        ApiResponse<Object> apiResponse = ApiResponse.ok(null);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
