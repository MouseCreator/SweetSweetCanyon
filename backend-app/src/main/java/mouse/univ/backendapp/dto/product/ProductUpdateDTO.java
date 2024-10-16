package mouse.univ.backendapp.dto.product;

import lombok.Data;

import java.util.List;

@Data
public class ProductUpdateDTO {
    private Long id;
    private String name;
    private List<Long> types;
}
