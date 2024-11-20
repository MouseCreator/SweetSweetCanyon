package mouse.univ.backendapp.dto.shop;

import lombok.Data;
@Data
public class ShopUpdateDTO {
    private Long id;
    private String name;
    private String description;
    private String address;
    private String hours;
    private String pictureUrl;
}
