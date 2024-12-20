package mouse.univ.backendapp.mapper;

import lombok.AllArgsConstructor;
import mouse.univ.backendapp.dto.sale.SaleResponseDTO;
import mouse.univ.backendapp.dto.shop.ShopResponseDTO;
import mouse.univ.backendapp.dto.used.UsedProductResponseDTO;
import mouse.univ.backendapp.model.Sale;
import mouse.univ.backendapp.model.Transaction;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class SaleMapperImpl implements SaleMapper {

    private final UsedProductMapper usedProductMapper;
    private final ShopMapper shopMapper;
    @Override
    public SaleResponseDTO toResponse(Sale sale) {
        SaleResponseDTO saleResponseDTO = new SaleResponseDTO();
        Transaction transaction = sale.getTransaction();
        saleResponseDTO.setId(sale.getId());
        saleResponseDTO.setType("sale");
        saleResponseDTO.setDate(transaction.getDate());

        List<UsedProductResponseDTO> list = transaction.getUsedProductList().stream().map(usedProductMapper::fromProduct).toList();

        saleResponseDTO.setProducts(list);
        saleResponseDTO.setUsername(transaction.getUsername());
        saleResponseDTO.setPrice(transaction.getPrice());
        ShopResponseDTO shop = shopMapper.toResponseDTO(transaction.getShop());
        saleResponseDTO.setShop(shop);
        return saleResponseDTO;
    }
}
