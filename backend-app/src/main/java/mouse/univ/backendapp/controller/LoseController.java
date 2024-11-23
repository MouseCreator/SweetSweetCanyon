package mouse.univ.backendapp.controller;

import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.api.ApiResponse;
import mouse.univ.backendapp.dto.loss.LossCreateDTO;
import mouse.univ.backendapp.dto.loss.LossResponseDTO;
import mouse.univ.backendapp.dto.user.UserDetails;
import mouse.univ.backendapp.service.transaction.LossService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/loss")
public class LoseController {

    private final LossService lossService;

    public ResponseEntity<ApiResponse<LossResponseDTO>> createLoss(LossCreateDTO lossCreateDTO) {
        UserDetails userDetails = UserDetails.asCashier();
        LossResponseDTO response  = lossService.loseProducts(lossCreateDTO, userDetails);
        ApiResponse<LossResponseDTO> api = ApiResponse.ok(response);
        return ResponseEntity.status(HttpStatus.CREATED).body(api);
    }
}
