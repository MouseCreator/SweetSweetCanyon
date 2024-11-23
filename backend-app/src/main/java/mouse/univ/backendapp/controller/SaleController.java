package mouse.univ.backendapp.controller;

import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.api.ApiResponse;
import mouse.univ.backendapp.dto.sale.SaleCreateDTO;
import mouse.univ.backendapp.dto.sale.SaleResponseDTO;
import mouse.univ.backendapp.dto.user.UserDetails;
import mouse.univ.backendapp.service.transaction.SaleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/sale")
public class SaleController {
    private final SaleService saleService;
    @PostMapping
    public ResponseEntity<ApiResponse<SaleResponseDTO>> createSale(@RequestBody SaleCreateDTO createDTO) {
        UserDetails userDetails = UserDetails.asCashier();
        SaleResponseDTO sale = saleService.saleProducts(createDTO, userDetails);
        ApiResponse<SaleResponseDTO> apiResponse = ApiResponse.ok(sale);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }
}
