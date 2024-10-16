package mouse.univ.backendapp.mapper;

import mouse.univ.backendapp.config.MapStructConfig;
import mouse.univ.backendapp.dto.product.ProductCreateDTO;
import mouse.univ.backendapp.dto.product.ProductResponseDTO;
import mouse.univ.backendapp.dto.product.ProductTypesResponseDTO;
import mouse.univ.backendapp.dto.product.ProductUpdateDTO;
import mouse.univ.backendapp.model.Product;
import org.mapstruct.Mapper;

@Mapper(config = MapStructConfig.class)
public interface ProductMapper {
    Product productFromCreateDTO(ProductCreateDTO createDTO);
    ProductResponseDTO toResponseDTO(Product product);
    ProductTypesResponseDTO toResponseDTOWithTypes(Product product);
    Product productFromUpdateDTO(ProductUpdateDTO updateDTO);
}
