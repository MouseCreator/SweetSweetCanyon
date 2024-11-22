package mouse.univ.backendapp.dto.transaction;

import lombok.Data;

@Data
public class TransactionItem {
    private Long productId;
    private Long amount;
}
