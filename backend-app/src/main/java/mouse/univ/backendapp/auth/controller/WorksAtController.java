package mouse.univ.backendapp.auth.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.api.ApiResponse;
import mouse.univ.backendapp.auth.dto.WorksAtShopResponseDTO;
import mouse.univ.backendapp.dto.user.UserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/works")
public class WorksAtController {
    @GetMapping("/shop")
    public ResponseEntity<ApiResponse<WorksAtShopResponseDTO>> getUserRoles(HttpServletRequest request) {
        UserDetails userDetails = UD.get(request);
        WorksAtShopResponseDTO result = new WorksAtShopResponseDTO();
        if (!userDetails.isExists()) {
            result.setShop(null);
        } else {
            result.setShop(userDetails.getAssociatedShopId());
        }
        ApiResponse<WorksAtShopResponseDTO> apiResponse = ApiResponse.ok(result);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
