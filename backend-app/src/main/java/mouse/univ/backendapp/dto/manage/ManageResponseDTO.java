package mouse.univ.backendapp.dto.manage;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ManageResponseDTO {
    private Long changesCount;

    public ManageResponseDTO(long count) {
        this.changesCount = count;
    }
}
