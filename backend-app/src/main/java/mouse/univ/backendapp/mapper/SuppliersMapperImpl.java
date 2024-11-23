package mouse.univ.backendapp.mapper;

import mouse.univ.backendapp.dto.suppliers.SuppliersResponseDTO;
import mouse.univ.backendapp.model.Supplier;
import org.springframework.stereotype.Service;

@Service
public class SuppliersMapperImpl implements SuppliersMapper {
    @Override
    public SuppliersResponseDTO map(Supplier supplier) {
        SuppliersResponseDTO responseDTO = new SuppliersResponseDTO();
        responseDTO.setId(supplier.getId());
        responseDTO.setName(supplier.getName());
        return responseDTO;
    }
}
