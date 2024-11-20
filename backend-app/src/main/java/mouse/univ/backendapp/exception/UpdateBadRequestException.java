package mouse.univ.backendapp.exception;

public class UpdateBadRequestException extends RuntimeException{
    public UpdateBadRequestException() {
    }

    public UpdateBadRequestException(String message) {
        super(message);
    }

    public UpdateBadRequestException(String message, Throwable cause) {
        super(message, cause);
    }
}
