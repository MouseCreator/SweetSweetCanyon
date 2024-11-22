package mouse.univ.backendapp.exception;

public class NoStockException extends RuntimeException{
    public NoStockException(String message) {
        super(message);
    }

    public NoStockException(Long shop, Long product) {
        super("No stock is initialized for shop " + shop + " and product " + product);
    }
}
