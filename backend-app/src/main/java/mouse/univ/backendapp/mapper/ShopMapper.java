package mouse.univ.backendapp.mapper;

import mouse.univ.backendapp.config.MapStructConfig;
import mouse.univ.backendapp.dto.shop.ShopCreateDTO;
import mouse.univ.backendapp.dto.shop.ShopResponseDTO;
import mouse.univ.backendapp.dto.shop.ShopUpdateDTO;
import mouse.univ.backendapp.model.Shop;
import org.mapstruct.Mapper;

@Mapper(config = MapStructConfig.class)
public interface ShopMapper {
    Shop fromCreateDTO(ShopCreateDTO createDTO);
    ShopResponseDTO toResponseDTO(Shop shop);
    Shop fromUpdateDTO(ShopUpdateDTO updateDTO);
}
