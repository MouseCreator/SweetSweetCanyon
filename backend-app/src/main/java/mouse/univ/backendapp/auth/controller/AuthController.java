package mouse.univ.backendapp.auth.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.api.ApiResponse;
import mouse.univ.backendapp.auth.dto.RegisterUserDTO;
import mouse.univ.backendapp.auth.fetch.FetchUserRoles;
import mouse.univ.backendapp.auth.service.RegisterService;
import mouse.univ.backendapp.dto.user.UserDetails;
import mouse.univ.backendapp.exception.ItemBadRequestException;
import mouse.univ.backendapp.exception.NotAuthenticatedException;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/auth")
public class AuthController {
    private final RegisterService registerService;
    private final FetchUserRoles fetchUserRoles;
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> registerUser(HttpServletRequest request, @RequestBody RegisterUserDTO userDTO) {
        UserDetails userDetails = UD.get(request);
        System.out.println(userDetails);
        registerService.register(userDTO);
        ApiResponse<String> apiResponse = ApiResponse.ok("Created");
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @GetMapping("/roles")
    public ResponseEntity<ApiResponse<String>> getUserRoles(HttpServletRequest request) {
        UserDetails userDetails = UD.get(request);
        if (!userDetails.isExists()) {
            throw new NotAuthenticatedException("User is not authenticated");
        }
        String roles = fetchUserRoles.fetch(userDetails.getSubs());
        ApiResponse<String> apiResponse = ApiResponse.ok(roles);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
