package mouse.univ.backendapp.service;

import mouse.univ.backendapp.dto.user.UserDetails;
import mouse.univ.backendapp.dto.user.UserRole;
import mouse.univ.backendapp.exception.PermissionException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsService {
    public void validateAdmin(UserDetails userDetails) {
        if (userDetails.getRole() != UserRole.ADMIN) {
            throw new PermissionException("Required admin status to perform the action");
        }
    }
    public void validateCashier(UserDetails userDetails) {
        if (userDetails.getRole() != UserRole.CASHIER) {
            throw new PermissionException("Required cashier status to perform the action");
        }
    }
    public void validateAdminOrCashier(UserDetails userDetails) {
        if (userDetails.getRole() != UserRole.CASHIER && userDetails.getRole() != UserRole.ADMIN) {
            throw new PermissionException("Required authorized status to perform the action");
        }
    }
}
