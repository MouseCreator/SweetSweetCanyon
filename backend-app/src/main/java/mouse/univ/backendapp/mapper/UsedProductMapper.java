package mouse.univ.backendapp.mapper;

import mouse.univ.backendapp.config.MapStructConfig;
import mouse.univ.backendapp.dto.used.UsedProductResponseDTO;
import mouse.univ.backendapp.model.UsedProduct;
import org.mapstruct.Mapper;

@Mapper(config = MapStructConfig.class)
public interface UsedProductMapper {
    UsedProductResponseDTO fromProduct(UsedProduct usedProduct);
}
