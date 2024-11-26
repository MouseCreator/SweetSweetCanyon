package mouse.univ.backendapp.auth.controller;

import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.api.ApiResponse;
import mouse.univ.backendapp.auth.dto.RegisterUserDTO;
import mouse.univ.backendapp.auth.service.RegisterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/auth")
public class AuthController {
    private final RegisterService registerService;
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> registerUser(@RequestBody RegisterUserDTO userDTO) {
        registerService.register(userDTO);
        ApiResponse<String> apiResponse = ApiResponse.ok("Created");
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }
}
