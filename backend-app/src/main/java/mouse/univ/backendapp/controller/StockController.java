package mouse.univ.backendapp.controller;

import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.api.ApiResponse;
import mouse.univ.backendapp.dto.stock.StockResponseDTO;
import mouse.univ.backendapp.service.StockService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/stocks")
public class StockController {

    private final StockService stockService;
    @GetMapping
    public ResponseEntity<ApiResponse<List<StockResponseDTO>>> getStocksByShopAndName(
            @RequestParam(name="shop", required = false) Long shopId, @RequestParam(name="name", required = false) String searchName) {
        List<StockResponseDTO> result = stockService.findByNameAndShop(searchName, shopId);
        ApiResponse<List<StockResponseDTO>> apiResponse = ApiResponse.ok(result);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
