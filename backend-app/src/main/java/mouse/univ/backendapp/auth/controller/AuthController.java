package mouse.univ.backendapp.auth.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.api.ApiResponse;
import mouse.univ.backendapp.auth.dto.RegisterUserDTO;
import mouse.univ.backendapp.auth.dto.RolePostDTO;
import mouse.univ.backendapp.auth.fetch.UserRolesCommunicator;
import mouse.univ.backendapp.auth.service.RegisterService;
import mouse.univ.backendapp.dto.user.UserDetails;
import mouse.univ.backendapp.exception.NotAuthenticatedException;
import mouse.univ.backendapp.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/auth")
public class AuthController {
    private final RegisterService registerService;
    private final UserRolesCommunicator roleManager;
    private final UserService userService;
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> registerUser(@RequestBody RegisterUserDTO userDTO) {
        registerService.register(userDTO);
        ApiResponse<String> apiResponse = ApiResponse.ok("Created");
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @GetMapping("/roles")
    public ResponseEntity<ApiResponse<String>> getUserRoles(HttpServletRequest request) {
        UserDetails userDetails = UD.get(request);
        String roles;
        if (!userDetails.isExists()) {
            roles = "none";
        }
        else {
            roles = roleManager.fetch(userDetails.getSubs());
        }
        ApiResponse<String> apiResponse = ApiResponse.ok(roles);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PostMapping("/roles")
    public ResponseEntity<ApiResponse<String>> setUserRoles(HttpServletRequest request, @RequestBody RolePostDTO role) {
        UserDetails userDetails = UD.get(request);
        if (!userDetails.isExists()) {
            throw new NotAuthenticatedException("User is not authenticated");
        }
        String post = roleManager.post(userDetails.getSubs(), role.getRole());
        ApiResponse<String> apiResponse = ApiResponse.ok(post);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @DeleteMapping("/roles")
    public ResponseEntity<ApiResponse<String>> deleteUserRoles(HttpServletRequest request, @RequestBody RolePostDTO role) {
        UserDetails userDetails = UD.get(request);
        if (!userDetails.isExists()) {
            throw new NotAuthenticatedException("User is not authenticated");
        }
        String post = roleManager.delete(userDetails.getSubs(), role.getRole());
        ApiResponse<String> apiResponse = ApiResponse.ok(post);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<ApiResponse<String>> deleteUser(HttpServletRequest request) {
        UserDetails userDetails = UD.get(request);
        if (!userDetails.isExists()) {
            throw new NotAuthenticatedException("User is not authenticated");
        }
        userService.deleteUser(userDetails);
        ApiResponse<String> apiResponse = ApiResponse.ok("Deleted");
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
