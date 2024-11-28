package mouse.univ.backendapp.controller;

import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.api.ApiResponse;
import mouse.univ.backendapp.auth.controller.UD;
import mouse.univ.backendapp.dto.sale.SaleCreateDTO;
import mouse.univ.backendapp.dto.sale.SaleResponseDTO;
import mouse.univ.backendapp.dto.user.UserDetails;
import mouse.univ.backendapp.service.transaction.SaleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/sale")
public class SaleController {
    private final SaleService saleService;
    @PostMapping
    public ResponseEntity<ApiResponse<SaleResponseDTO>> createSale(@RequestBody SaleCreateDTO createDTO,
                                                                   @RequestAttribute("user") UserDetails userDetails) {
        UD.validateCashier(userDetails);
        SaleResponseDTO sale = saleService.saleProducts(createDTO, userDetails);
        ApiResponse<SaleResponseDTO> apiResponse = ApiResponse.ok(sale);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<SaleResponseDTO>>
    getSupplyById(@PathVariable("id") Long id) {
        SaleResponseDTO supply = saleService.getSaleById(id);
        ApiResponse<SaleResponseDTO> apiResponse = ApiResponse.ok(supply);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
