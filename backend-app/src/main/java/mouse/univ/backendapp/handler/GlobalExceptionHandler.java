package mouse.univ.backendapp.handler;

import mouse.univ.backendapp.api.ApiResponse;
import mouse.univ.backendapp.exception.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice

public class GlobalExceptionHandler {

    private static final Logger logger = LogManager.getLogger(GlobalExceptionHandler.class);
    @ExceptionHandler(ItemBadRequestException.class)
    public ResponseEntity<ApiResponse<Object>> handleBadRequestException(ItemBadRequestException ex) {
        ApiResponse<Object> apiResponse = new ApiResponse<>(false, ex.getMessage(), null);
        logger.error(ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiResponse);
    }
    @ExceptionHandler(DataNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleEntityNotFoundException(DataNotFoundException ex) {
        ApiResponse<Object> apiResponse = new ApiResponse<>(false, ex.getMessage(), null);
        logger.error(ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiResponse);
    }
    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ApiResponse<Object>> handleEntityNotFoundException(ForbiddenException ex) {
        ApiResponse<Object> apiResponse = new ApiResponse<>(false, ex.getMessage(), null);
        logger.error(ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiResponse);
    }
    @ExceptionHandler(PermissionException.class)
    public ResponseEntity<ApiResponse<Object>> handlePermissionException(PermissionException ex) {
        ApiResponse<Object> apiResponse = new ApiResponse<>(false, ex.getMessage(), null);
        logger.error(ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(apiResponse);
    }
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<Object>> handleRuntimeError(RuntimeException ex) {
        ApiResponse<Object> apiResponse = new ApiResponse<>(false, "Internal error", null);
        logger.error(ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiResponse);
    }
    @ExceptionHandler(JSONException.class)
    public ResponseEntity<ApiResponse<Object>> handleJsonException(JSONException ex) {
        ApiResponse<Object> apiResponse = new ApiResponse<>(false, "Failed to parse JSON", null);
        logger.error(ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiResponse);
    }

    @ExceptionHandler(UpdateNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleEntityNotFoundException(UpdateNotFoundException ex) {
        ApiResponse<Object> apiResponse = new ApiResponse<>(false, ex.getMessage(), null);
        logger.error(ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiResponse);
    }

    @ExceptionHandler(ProductFormException.class)
    public ResponseEntity<ApiResponse<Object>> handleProductFormError(ProductFormException ex) {
        ApiResponse<Object> apiResponse = new ApiResponse<>(false, "FORM_ERROR", ex.getDetails());
        logger.error(ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiResponse);
    }

    @ExceptionHandler(UpdateBadRequestException.class)
    public ResponseEntity<ApiResponse<Object>> handleEntityNotFoundException(UpdateBadRequestException ex) {
        ApiResponse<Object> apiResponse = new ApiResponse<>(false, ex.getMessage(), null);
        logger.error(ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiResponse);
    }
}
