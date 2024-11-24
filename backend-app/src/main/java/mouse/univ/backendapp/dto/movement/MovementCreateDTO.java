package mouse.univ.backendapp.dto.movement;

import lombok.Data;
import mouse.univ.backendapp.dto.transaction.TransactionItem;

import java.util.List;
@Data
public class MovementCreateDTO {
    private List<TransactionItem> items;
    private Long toShop;
}
