package mouse.univ.backendapp.dto.supply;

import lombok.Data;
import mouse.univ.backendapp.dto.shop.ShopResponseDTO;
import mouse.univ.backendapp.dto.suppliers.SuppliersResponseDTO;
import mouse.univ.backendapp.dto.used.UsedProductResponseDTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
@Data
public class SupplyResponseDTO {
    private Long id;
    private String type;
    private LocalDateTime date;
    private List<UsedProductResponseDTO> products;
    private String username;
    private BigDecimal price;
    private ShopResponseDTO shop;
    private SuppliersResponseDTO supplier;
    private String supplierName;
}
