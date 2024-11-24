package mouse.univ.backendapp.controller;

import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.api.ApiResponse;
import mouse.univ.backendapp.dto.loss.LossReasonResponseDTO;
import mouse.univ.backendapp.service.LossReasonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reasons")
public class LossReasonsController {
    private final LossReasonService lossReasonService;
    @GetMapping
    public ResponseEntity<ApiResponse<List<LossReasonResponseDTO>>> getAllReasons() {
        List<LossReasonResponseDTO> allLossReasons = lossReasonService.getAllLossReasons();
        ApiResponse<List<LossReasonResponseDTO>> api = ApiResponse.ok(allLossReasons);
        return ResponseEntity.status(HttpStatus.OK).body(api);
    }
}
