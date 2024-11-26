package mouse.univ.backendapp.auth.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.dto.user.UserDetails;
import mouse.univ.backendapp.dto.user.UserRole;
import mouse.univ.backendapp.model.User;
import mouse.univ.backendapp.model.UserBind;
import mouse.univ.backendapp.model.UserContacts;
import mouse.univ.backendapp.repository.ContactsRepository;
import mouse.univ.backendapp.repository.UserBindRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserBindService {
    private final UserBindRepository userBindRepository;
    private final ContactsRepository contactsRepository;
    @Transactional
    public UserDetails provideUserDetails(String sub, String role) {
        Optional<UserBind> byId = userBindRepository.findById(sub);
        if (byId.isEmpty()) {
            return UserDetails.none();
        }
        UserBind userBind = byId.get();
        User user = userBind.getUser();
        Long id = user.getId();
        String name = user.getName();
        UserDetails userDetails = new UserDetails();
        userDetails.setExists(true);
        userDetails.setId(id);
        userDetails.setName(name);
        userDetails.setSubs(sub);
        UserRole myRole = mapRole(role);
        userDetails.setRole(myRole);
        Optional<UserContacts> contact = contactsRepository.findById(id);
        contact.ifPresent(userContacts -> userDetails.setAssociatedShopId(userContacts.getShopId()));
        return userDetails;
    }

    private UserRole mapRole(String role) {
        if (role == null) {
            return UserRole.NONE;
        }
        role = role.toLowerCase();
        return switch (role) {
            case "admin" -> UserRole.ADMIN;
            case "cashier" -> UserRole.CASHIER;
            default -> UserRole.NONE;
        };
    }
}
