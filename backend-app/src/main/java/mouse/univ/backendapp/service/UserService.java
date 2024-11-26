package mouse.univ.backendapp.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.dto.user.UserDetails;
import mouse.univ.backendapp.dto.user.UserResponseDTO;
import mouse.univ.backendapp.dto.user.UserUpdateDTO;
import mouse.univ.backendapp.exception.DataNotFoundException;
import mouse.univ.backendapp.model.User;
import mouse.univ.backendapp.model.UserContacts;
import mouse.univ.backendapp.repository.ContactsRepository;
import mouse.univ.backendapp.repository.UserBindRepository;
import mouse.univ.backendapp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ContactsRepository contactsRepository;
    private final UserBindRepository userBindRepository;

    public UserResponseDTO getUserByAuth(UserDetails userDetails) {
        Long id = userDetails.getId();
        Optional<User> byId = userRepository.findById(id);
        User user = byId.orElseThrow(() -> new DataNotFoundException("No user with id " + byId));
        Optional<UserContacts> userContacts = contactsRepository.findById(user.getId());
        UserContacts contacts = userContacts.orElseThrow(() -> new DataNotFoundException("No user contacts with id " + byId));

        return toResponse(user, contacts);
    }
    @Transactional
    public UserResponseDTO updateUser(UserUpdateDTO userUpdateDTO) {
        Long id = userUpdateDTO.getId();
        Optional<User> byId = userRepository.findById(id);
        User user = byId.orElseThrow(() -> new DataNotFoundException("No user with id " + byId));
        user.setName(userUpdateDTO.getName());
        UserContacts contacts = contactsRepository.findById(id).orElseThrow(DataNotFoundException::new);
        contacts.setEmail(userUpdateDTO.getEmail());
        contacts.setPhone(userUpdateDTO.getPhone());
        contacts.setShopId(userUpdateDTO.getShopId());

        user = userRepository.save(user);
        contacts = contactsRepository.save(contacts);
        return toResponse(user, contacts);
    }

    @Transactional
    public void deleteUserById(Long userId) {
        userBindRepository.deleteByUser(userId);
        contactsRepository.deleteById(userId);
    }
    protected UserResponseDTO toResponse(User user, UserContacts contacts) {
        Long id = user.getId();
        UserResponseDTO userResponseDTO = new UserResponseDTO();
        userResponseDTO.setId(id);
        userResponseDTO.setName(user.getName());
        userResponseDTO.setEmail(contacts.getEmail());
        userResponseDTO.setPhone(contacts.getPhone());
        userResponseDTO.setShopId(contacts.getShopId());
        return userResponseDTO;
    }
}
