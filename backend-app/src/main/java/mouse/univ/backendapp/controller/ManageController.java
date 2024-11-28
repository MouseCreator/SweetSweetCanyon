package mouse.univ.backendapp.controller;

import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.api.ApiResponse;
import mouse.univ.backendapp.auth.controller.UD;
import mouse.univ.backendapp.dto.manage.ManageResponseDTO;
import mouse.univ.backendapp.dto.manage.ManageShopDTO;
import mouse.univ.backendapp.dto.user.UserDetails;
import mouse.univ.backendapp.service.transaction.StoreManagingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/manage")
public class ManageController {
    private final StoreManagingService service;
    @PostMapping
    public ResponseEntity<ApiResponse<ManageResponseDTO>> manageShop(@RequestBody ManageShopDTO manageShopDTO,
                                                                     @RequestAttribute("user") UserDetails userDetails) {
        UD.validateAdminOrCashier(userDetails);
        ManageResponseDTO manage = service.manage(manageShopDTO, userDetails);
        ApiResponse<ManageResponseDTO> apiResponse = ApiResponse.ok(manage);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
