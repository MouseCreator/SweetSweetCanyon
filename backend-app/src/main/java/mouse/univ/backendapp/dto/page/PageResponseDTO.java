package mouse.univ.backendapp.dto.page;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageResponseDTO {
    private Integer numberTransactions;
    private Integer numberPages;
}
