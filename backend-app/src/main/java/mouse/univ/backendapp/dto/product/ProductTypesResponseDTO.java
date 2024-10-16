package mouse.univ.backendapp.dto.product;

import lombok.Data;
import mouse.univ.backendapp.dto.TypeResponseDTO;

import java.util.List;

@Data
public class ProductTypesResponseDTO {
    private Long id;
    private String name;
    private List<TypeResponseDTO> types;
}
