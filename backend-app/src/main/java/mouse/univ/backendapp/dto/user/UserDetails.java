package mouse.univ.backendapp.dto.user;

import lombok.Data;

@Data
public class UserDetails {
    private boolean exists;
    private String name;
    private String subs;
    private Long id;
    private Long associatedShopId;
    private UserRole role;

    public static UserDetails asAdmin() {
        UserDetails userDetails = new UserDetails();
        userDetails.exists = true;
        userDetails.id = null;
        userDetails.setRole(UserRole.ADMIN);
        userDetails.setName("Admin");
        userDetails.setAssociatedShopId(null);
        return userDetails;
    }
    public static UserDetails asCashier() {
        UserDetails userDetails = new UserDetails();
        userDetails.exists = true;
        userDetails.id = null;
        userDetails.setRole(UserRole.CASHIER);
        userDetails.setName("Cashier");
        userDetails.setAssociatedShopId(4L);
        return userDetails;
    }

    public static UserDetails none() {
        UserDetails userDetails = new UserDetails();
        userDetails.exists = false;
        userDetails.id = null;
        userDetails.setRole(UserRole.NONE);
        userDetails.setName(null);
        userDetails.setAssociatedShopId(null);
        return userDetails;
    }
}
