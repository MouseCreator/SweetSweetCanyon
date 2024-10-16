package mouse.univ.backendapp.dto.product;

import lombok.Data;

import java.util.List;

@Data
public class ProductCreateDTO {
    private String name;
    private List<Integer> typeIds;
}
