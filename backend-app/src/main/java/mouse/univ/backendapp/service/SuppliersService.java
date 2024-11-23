package mouse.univ.backendapp.service;

import lombok.AllArgsConstructor;
import mouse.univ.backendapp.dto.suppliers.SuppliersResponseDTO;
import mouse.univ.backendapp.mapper.SuppliersMapper;
import mouse.univ.backendapp.model.Supplier;
import mouse.univ.backendapp.repository.SupplierRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class SuppliersService {
    private final SupplierRepository supplierRepository;
    private final SuppliersMapper suppliersMapper;
    public List<SuppliersResponseDTO> getAllSuppliers() {
        List<Supplier> allSuppliers = supplierRepository.findAll();
        return allSuppliers.stream().map(suppliersMapper::map).toList();
    }
}
