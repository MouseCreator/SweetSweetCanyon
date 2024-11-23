package mouse.univ.backendapp.dto.loss;

import lombok.Data;
import mouse.univ.backendapp.dto.transaction.TransactionItem;

import java.util.List;

@Data
public class LossCreateDTO {
    private List<TransactionItem> items;
    private Long reasonId;
    private String comment;
}
