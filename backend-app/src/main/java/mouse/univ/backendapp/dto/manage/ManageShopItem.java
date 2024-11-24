package mouse.univ.backendapp.dto.manage;

import lombok.Data;

@Data
public class ManageShopItem {
    private String type;
    private Long moveTo;
    private Long productId;
    private Long amount;
    private Long reasonId;
    private String comment;
}
