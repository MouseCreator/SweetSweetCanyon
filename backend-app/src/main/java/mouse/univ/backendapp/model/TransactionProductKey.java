package mouse.univ.backendapp.model;

import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Embeddable
@Data
public class TransactionProductKey implements Serializable {
    private Long transactionId;
    private Long productId;
    @Serial
    private static final long serialVersionUID = 10L;
}
