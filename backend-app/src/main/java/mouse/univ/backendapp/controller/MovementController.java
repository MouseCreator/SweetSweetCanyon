package mouse.univ.backendapp.controller;

import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.api.ApiResponse;
import mouse.univ.backendapp.dto.movement.MovementResponseDTO;
import mouse.univ.backendapp.service.transaction.MovementService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/move")
public class MovementController {
    private final MovementService movementService;
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MovementResponseDTO>>
    getSupplyById(@PathVariable("id") Long id) {
        MovementResponseDTO supply = movementService.getMovementById(id);
        ApiResponse<MovementResponseDTO> apiResponse = ApiResponse.ok(supply);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
