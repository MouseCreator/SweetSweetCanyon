package mouse.univ.backendapp.controller;

import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.api.ApiResponse;
import mouse.univ.backendapp.auth.controller.UD;
import mouse.univ.backendapp.dto.user.UserDetails;
import mouse.univ.backendapp.dto.user.UserResponseDTO;
import mouse.univ.backendapp.dto.user.UserUpdateDTO;
import mouse.univ.backendapp.exception.NotAuthenticatedException;
import mouse.univ.backendapp.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/users")
public class UserController {
    private final UserService userService;
    @GetMapping
    public ResponseEntity<ApiResponse<UserResponseDTO>> getUser(@RequestAttribute("user") UserDetails userDetails) {
        if (userDetails.empty()) {
            throw new NotAuthenticatedException();
        }
        UserResponseDTO userResponseDTO = userService.getUserByAuth(userDetails);
        ApiResponse<UserResponseDTO> apiResponse = ApiResponse.ok(userResponseDTO);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @PutMapping
    public ResponseEntity<ApiResponse<UserResponseDTO>> putUser(@RequestBody UserUpdateDTO userUpdateDTO) {
        UserResponseDTO userResponseDTO = userService.updateUser(userUpdateDTO);
        ApiResponse<UserResponseDTO> apiResponse = ApiResponse.ok(userResponseDTO);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteUser(@PathVariable("id") Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.ok(null));
    }
}
