package mouse.univ.backendapp.dto.sale;

import lombok.Data;
import mouse.univ.backendapp.dto.transaction.TransactionItem;

import java.util.List;
@Data
public class SaleCreateDTO {
    private List<TransactionItem> items;
}
