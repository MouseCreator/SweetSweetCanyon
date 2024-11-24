package mouse.univ.backendapp.controller;

import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.dto.manage.ManageResponseDTO;
import mouse.univ.backendapp.dto.manage.ManageShopDTO;
import mouse.univ.backendapp.dto.user.UserDetails;
import mouse.univ.backendapp.service.transaction.StoreManagingService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/manage")
public class ManageController {
    private final StoreManagingService service;
    @PostMapping
    public ManageResponseDTO manageShop(ManageShopDTO manageShopDTO) {
        UserDetails userDetails = UserDetails.asAdmin();
        return service.manage(manageShopDTO, userDetails);
    }
}
