package mouse.univ.backendapp.controller;

import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.api.ApiResponse;
import mouse.univ.backendapp.dto.supply.SupplyCreateDTO;
import mouse.univ.backendapp.dto.supply.SupplyResponseDTO;
import mouse.univ.backendapp.dto.user.UserDetails;
import mouse.univ.backendapp.service.transaction.SupplyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/supply")
public class SupplyController {
    private final SupplyService supplyService;
    @PostMapping
    public ResponseEntity<ApiResponse<SupplyResponseDTO>>
    createSale(@RequestBody SupplyCreateDTO supplyCreateDTO) {
        UserDetails userDetails = UserDetails.asCashier();
        SupplyResponseDTO supply = supplyService.supplyProducts(supplyCreateDTO, userDetails);
        ApiResponse<SupplyResponseDTO> apiResponse = ApiResponse.ok(supply);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<SupplyResponseDTO>>
    getSupplyById(@PathVariable("id") Long id) {
        SupplyResponseDTO supply = supplyService.getSupplyById(id);
        ApiResponse<SupplyResponseDTO> apiResponse = ApiResponse.ok(supply);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
