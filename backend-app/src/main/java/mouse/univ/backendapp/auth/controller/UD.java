package mouse.univ.backendapp.auth.controller;

import jakarta.servlet.http.HttpServletRequest;
import mouse.univ.backendapp.dto.user.UserDetails;
import mouse.univ.backendapp.dto.user.UserRole;
import mouse.univ.backendapp.exception.ForbiddenException;

public class UD {
    public static UserDetails get(HttpServletRequest request) {
        if (request == null) {
            return UserDetails.none();
        }
        Object user = request.getAttribute("user");
        if (user == null) {
            return UserDetails.none();
        }
        return (UserDetails) user;
    }

    public static void validateAdmin(UserDetails userDetails) {
        if (UserRole.ADMIN.equals(userDetails.getRole())) {
            return;
        }
        throw new ForbiddenException();
    }

    public static void validateAdminOrCashier(UserDetails userDetails) {
        if (UserRole.CASHIER.equals(userDetails.getRole())) {
            return;
        }
        if (UserRole.ADMIN.equals(userDetails.getRole())) {
            return;
        }
        throw new ForbiddenException();
    }
    public static void validateCashier(UserDetails userDetails) {
        if (UserRole.CASHIER.equals(userDetails.getRole())) {
            return;
        }
        throw new ForbiddenException();
    }
}
