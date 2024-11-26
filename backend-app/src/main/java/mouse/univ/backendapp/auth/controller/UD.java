package mouse.univ.backendapp.auth.controller;

import jakarta.servlet.http.HttpServletRequest;
import mouse.univ.backendapp.dto.user.UserDetails;

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
}
