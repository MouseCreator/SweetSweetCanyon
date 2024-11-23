package mouse.univ.backendapp.dto.user;

import lombok.Data;

@Data
public class UserDetails {
    private String name;
    private Long associatedShopId;
    private UserRole role;

    public static UserDetails asAdmin() {
        UserDetails userDetails = new UserDetails();
        userDetails.setRole(UserRole.ADMIN);
        userDetails.setName("Admin");
        userDetails.setAssociatedShopId(null);
        return userDetails;
    }
    public static UserDetails asCashier() {
        UserDetails userDetails = new UserDetails();
        userDetails.setRole(UserRole.CASHIER);
        userDetails.setName("Cashier");
        userDetails.setAssociatedShopId(4L);
        return userDetails;
    }
}
