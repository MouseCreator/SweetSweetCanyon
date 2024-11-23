package mouse.univ.backendapp.mapper;

import mouse.univ.backendapp.dto.supply.SupplyResponseDTO;
import mouse.univ.backendapp.model.Supply;

public interface SupplyMapper {
    SupplyResponseDTO toResponse(Supply supply);
}
