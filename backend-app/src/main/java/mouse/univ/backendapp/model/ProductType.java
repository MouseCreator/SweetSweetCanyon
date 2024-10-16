package mouse.univ.backendapp.model;

import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
public class ProductType {
    @OneToMany(mappedBy = "product_id")
    private Product product;
    @OneToMany(mappedBy = "type_id")
    private Type type;
}
