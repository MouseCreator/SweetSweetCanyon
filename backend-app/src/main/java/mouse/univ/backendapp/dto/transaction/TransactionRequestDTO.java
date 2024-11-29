package mouse.univ.backendapp.dto.transaction;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionRequestDTO {
    private String type;
    private Long shop;
    private String sort;
    private Integer itemsPerPage;
    private Integer currentPage;
}
