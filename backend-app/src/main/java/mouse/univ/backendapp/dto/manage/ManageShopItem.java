package mouse.univ.backendapp.dto.manage;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ManageShopItem {
    private String type;
    private Long moveTo;
    private Long productId;
    private Long amount;
    private Long reasonId;
    private String comment;
}
