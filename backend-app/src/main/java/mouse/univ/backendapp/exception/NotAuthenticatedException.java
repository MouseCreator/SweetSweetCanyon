package mouse.univ.backendapp.exception;

public class NotAuthenticatedException extends RuntimeException {
    public NotAuthenticatedException() {
    }

    public NotAuthenticatedException(String message) {
        super(message);
    }
}
