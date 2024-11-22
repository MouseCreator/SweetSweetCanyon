package mouse.univ.backendapp.exception;

public class NotEnoughProductsException extends RuntimeException{
    public NotEnoughProductsException(String message) {
        super(message);
    }
    public NotEnoughProductsException(Long desired, Long available) {
        super("Not enough products. Desired amount " + desired + ", available: " + available);
    }
}
