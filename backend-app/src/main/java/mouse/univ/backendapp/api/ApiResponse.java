package mouse.univ.backendapp.api;

import lombok.Data;
import lombok.NoArgsConstructor;
import mouse.univ.backendapp.dto.product.ProductResponseDTO;

@Data
@NoArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private String error;
    private T data;
    public ApiResponse(boolean success, String error, T data) {
        this.success = success;
        this.error = error;
        this.data = data;
    }

    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(true, "", data);
    }
}
