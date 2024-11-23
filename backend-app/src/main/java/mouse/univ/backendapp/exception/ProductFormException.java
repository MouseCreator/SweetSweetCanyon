package mouse.univ.backendapp.exception;

import lombok.Getter;

@Getter
public class ProductFormException extends RuntimeException{
    private final ProductFormErrorDetails details;
    public ProductFormException(ProductFormErrorDetails details) {
        super(details.getPrimaryError());
        this.details = details;
    }

}
