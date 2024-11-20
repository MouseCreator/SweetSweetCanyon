package mouse.univ.backendapp.dto.shop;

import lombok.Data;

@Data
public class ShopCreateDTO {
    private String name;
    private String description;
    private String address;
    private String hours;
    private String pictureUrl;
}
