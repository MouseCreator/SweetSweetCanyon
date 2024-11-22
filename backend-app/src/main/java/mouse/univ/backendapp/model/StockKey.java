package mouse.univ.backendapp.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockKey implements Serializable {
    private Long shopId;
    private Long productId;
    @Serial
    private static final long serialVersionUID = 20L;

}

