package mouse.univ.backendapp.mapper;

import mouse.univ.backendapp.dto.shop.ShopResponseDTO;
import mouse.univ.backendapp.dto.suppliers.SuppliersResponseDTO;
import mouse.univ.backendapp.dto.supply.SupplyResponseDTO;
import mouse.univ.backendapp.dto.used.UsedProductResponseDTO;
import mouse.univ.backendapp.model.Supply;
import mouse.univ.backendapp.model.Transaction;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplyMapperImpl implements SupplyMapper {

    private final SuppliersMapper suppliersMapper;
    private final UsedProductMapper usedProductMapper;
    private final ShopMapper shopMapper;
    public SupplyMapperImpl(SuppliersMapper suppliersMapper, UsedProductMapper usedProductMapper, ShopMapper shopMapper) {
        this.suppliersMapper = suppliersMapper;
        this.usedProductMapper = usedProductMapper;
        this.shopMapper = shopMapper;
    }

    public SupplyResponseDTO toResponse(Supply supply) {
        SupplyResponseDTO supplyResponseDTO = new SupplyResponseDTO();
        Transaction transaction = supply.getTransaction();

        List<UsedProductResponseDTO> list = transaction.getUsedProductList()
                .stream()
                .map(usedProductMapper::fromProduct)
                .toList();
        SuppliersResponseDTO supplier = suppliersMapper.map(supply.getSupplier());

        supplyResponseDTO.setId(supply.getId());
        supplyResponseDTO.setDate(transaction.getDate());
        supplyResponseDTO.setPrice(transaction.getPrice());
        supplyResponseDTO.setProducts(list);
        supplyResponseDTO.setType("supply");
        supplyResponseDTO.setSupplier(supplier);
        supplyResponseDTO.setSupplierName(supply.getSupplierName());
        supplyResponseDTO.setUsername(transaction.getUsername());
        ShopResponseDTO shop = shopMapper.toResponseDTO(transaction.getShop());
        supplyResponseDTO.setShop(shop);
        return supplyResponseDTO;
    }
}
