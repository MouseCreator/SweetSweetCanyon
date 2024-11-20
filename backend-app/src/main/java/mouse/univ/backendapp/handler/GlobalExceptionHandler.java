package mouse.univ.backendapp.handler;

import mouse.univ.backendapp.api.ApiResponse;
import mouse.univ.backendapp.exception.DataNotFoundException;
import mouse.univ.backendapp.exception.UpdateBadRequestException;
import mouse.univ.backendapp.exception.UpdateNotFoundException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice

public class GlobalExceptionHandler {

    private static final Logger logger = LogManager.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(DataNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleEntityNotFoundException(DataNotFoundException ex) {
        ApiResponse<Object> apiResponse = new ApiResponse<>(false, ex.getMessage(), null);
        logger.error(ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiResponse);
    }
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<Object>> handleRuntimeError(RuntimeException ex) {
        ApiResponse<Object> apiResponse = new ApiResponse<>(false, "Internal error", null);
        logger.error(ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiResponse);
    }

    @ExceptionHandler(UpdateNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleEntityNotFoundException(UpdateNotFoundException ex) {
        ApiResponse<Object> apiResponse = new ApiResponse<>(false, ex.getMessage(), null);
        logger.error(ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiResponse);
    }

    @ExceptionHandler(UpdateBadRequestException.class)
    public ResponseEntity<ApiResponse<Object>> handleEntityNotFoundException(UpdateBadRequestException ex) {
        ApiResponse<Object> apiResponse = new ApiResponse<>(false, ex.getMessage(), null);
        logger.error(ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiResponse);
    }
}
