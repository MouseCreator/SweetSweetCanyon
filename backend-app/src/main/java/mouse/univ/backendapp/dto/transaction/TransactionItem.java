package mouse.univ.backendapp.dto.transaction;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionItem {
    private Long productId;
    private Long amount;
}
