package mouse.univ.backendapp.mapper;

import mouse.univ.backendapp.dto.suppliers.SuppliersResponseDTO;
import mouse.univ.backendapp.model.Supplier;


public interface SuppliersMapper {
    SuppliersResponseDTO map(Supplier supplier);
}
