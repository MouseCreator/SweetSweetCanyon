package mouse.univ.backendapp.mapper;

import mouse.univ.backendapp.dto.sale.SaleResponseDTO;
import mouse.univ.backendapp.model.Sale;

public interface SaleMapper {
    SaleResponseDTO toResponse(Sale sale);
}
