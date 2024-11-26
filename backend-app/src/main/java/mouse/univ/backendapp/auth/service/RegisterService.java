package mouse.univ.backendapp.auth.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.auth.dto.RegisterUserDTO;
import mouse.univ.backendapp.model.User;
import mouse.univ.backendapp.model.UserBind;
import mouse.univ.backendapp.model.UserContacts;
import mouse.univ.backendapp.repository.ContactsRepository;
import mouse.univ.backendapp.repository.UserBindRepository;
import mouse.univ.backendapp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RegisterService {

    private final ContactsRepository contactsRepository;
    private final UserBindRepository userBindRepository;
    private final UserRepository userRepository;
    @Transactional
    public void register(RegisterUserDTO dto) {
        String sub = dto.getSub();
        Optional<UserBind> subOptional = userBindRepository.findById(sub);
        if (subOptional.isEmpty()) {
            saveNewUser(dto);
        }
    }
    @Transactional
    protected void saveNewUser(RegisterUserDTO dto) {
        String sub = dto.getSub();
        User newUser = new User();
        newUser.setName(dto.getName());
        User saved = userRepository.save(newUser);
        UserBind userBind = new UserBind();
        userBind.setSub(sub);
        userBind.setUser(saved);

        UserContacts contacts = new UserContacts();
        contacts.setId(saved.getId());
        contacts.setEmail(dto.getEmail());
        contacts.setPhone(null);
        contacts.setShopId(null);

        contactsRepository.save(contacts);
        userBindRepository.save(userBind);
    }
}
