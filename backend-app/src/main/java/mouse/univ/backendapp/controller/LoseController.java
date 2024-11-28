package mouse.univ.backendapp.controller;

import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.api.ApiResponse;
import mouse.univ.backendapp.auth.controller.UD;
import mouse.univ.backendapp.dto.loss.LossCreateDTO;
import mouse.univ.backendapp.dto.loss.LossResponseDTO;
import mouse.univ.backendapp.dto.user.UserDetails;
import mouse.univ.backendapp.service.transaction.LossService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/loss")
public class LoseController {

    private final LossService lossService;
    @PostMapping
    public ResponseEntity<ApiResponse<LossResponseDTO>> createLoss(@RequestBody LossCreateDTO lossCreateDTO,
                                                                   @RequestAttribute("user") UserDetails userDetails) {
        UD.validateCashier(userDetails);
        LossResponseDTO response  = lossService.loseProducts(lossCreateDTO, userDetails);
        ApiResponse<LossResponseDTO> api = ApiResponse.ok(response);
        return ResponseEntity.status(HttpStatus.CREATED).body(api);
    }
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<LossResponseDTO>>
    getSupplyById(@PathVariable("id") Long id) {
        LossResponseDTO supply = lossService.getLossById(id);
        ApiResponse<LossResponseDTO> apiResponse = ApiResponse.ok(supply);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
