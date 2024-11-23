package mouse.univ.backendapp.controller;

import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.api.ApiResponse;
import mouse.univ.backendapp.dto.suppliers.SuppliersResponseDTO;
import mouse.univ.backendapp.service.SuppliersService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/suppliers")
public class SuppliersController {
    private final SuppliersService suppliersService;
    @GetMapping
    public ResponseEntity<ApiResponse<List<SuppliersResponseDTO>>> getAllSuppliers() {
        List<SuppliersResponseDTO> allSuppliers = suppliersService.getAllSuppliers();
        ApiResponse<List<SuppliersResponseDTO>> apiResponse = ApiResponse.ok(allSuppliers);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
