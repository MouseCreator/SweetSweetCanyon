package mouse.univ.backendapp.exception;

public class UpdateNotFoundException extends RuntimeException{
    public UpdateNotFoundException() {
    }

    public UpdateNotFoundException(String message) {
        super(message);
    }

    public UpdateNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
