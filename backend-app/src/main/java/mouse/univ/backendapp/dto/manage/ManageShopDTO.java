package mouse.univ.backendapp.dto.manage;

import lombok.Data;

import java.util.List;

@Data
public class ManageShopDTO {
    private Long shopId;
    private List<ManageShopItem> items;
}
