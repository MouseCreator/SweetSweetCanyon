package mouse.univ.backendapp.controller;

import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.api.ApiResponse;
import mouse.univ.backendapp.dto.indicator.IndicatorRequestDTO;
import mouse.univ.backendapp.dto.indicator.IndicatorResponseDTO;
import mouse.univ.backendapp.service.indicator.IndicatorServiceWrapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/report")
public class ReportController {
    private final IndicatorServiceWrapper wrapper;
    @PostMapping
    public ResponseEntity<ApiResponse<IndicatorResponseDTO>> getReport(@RequestBody IndicatorRequestDTO requestDTO) {
        IndicatorResponseDTO report = wrapper.getReport(requestDTO);
        ApiResponse<IndicatorResponseDTO> apiResponse = ApiResponse.ok(report);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
