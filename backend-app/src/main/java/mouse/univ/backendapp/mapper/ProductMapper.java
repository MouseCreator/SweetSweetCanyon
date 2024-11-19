package mouse.univ.backendapp.mapper;

import mouse.univ.backendapp.config.MapStructConfig;

import mouse.univ.backendapp.dto.product.ProductCreateDTO;
import mouse.univ.backendapp.dto.product.ProductResponseDTO;
import mouse.univ.backendapp.dto.product.ProductUpdateDTO;
import mouse.univ.backendapp.model.Product;
import org.mapstruct.Mapper;

@Mapper(config = MapStructConfig.class)
public interface ProductMapper {
    Product fromCreateDTO(ProductCreateDTO productCreateDTO);
    ProductResponseDTO toResponseDTO(Product product);
    Product fromUpdateDTO(ProductUpdateDTO updateDTO);
}
