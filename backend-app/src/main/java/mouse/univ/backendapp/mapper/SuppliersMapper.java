package mouse.univ.backendapp.mapper;

import mouse.univ.backendapp.config.MapStructConfig;
import mouse.univ.backendapp.dto.suppliers.SuppliersResponseDTO;
import mouse.univ.backendapp.model.Supplier;
import org.mapstruct.Mapper;

@Mapper(config = MapStructConfig.class)
public interface SuppliersMapper {
    SuppliersResponseDTO map(Supplier supplier);
}
