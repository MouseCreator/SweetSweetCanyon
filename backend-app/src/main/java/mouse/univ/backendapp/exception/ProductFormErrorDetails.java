package mouse.univ.backendapp.exception;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;
@Data
public class ProductFormErrorDetails {
    private String primaryError;
    public List<ProductFormSpecific> productSpecific;

    public ProductFormErrorDetails() {
        primaryError = "";
        productSpecific = new ArrayList<>();
    }

}
