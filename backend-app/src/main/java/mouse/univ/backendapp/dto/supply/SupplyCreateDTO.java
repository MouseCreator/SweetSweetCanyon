package mouse.univ.backendapp.dto.supply;

import lombok.Data;
import mouse.univ.backendapp.dto.transaction.TransactionItem;

import java.util.List;

@Data
public class SupplyCreateDTO {
    private List<TransactionItem> items;
    private Long supplierId;
    private String supplierName;
}
