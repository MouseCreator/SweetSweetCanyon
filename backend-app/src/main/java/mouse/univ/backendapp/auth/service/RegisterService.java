package mouse.univ.backendapp.auth.service;

import mouse.univ.backendapp.auth.dto.RegisterUserDTO;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {
    public void register(RegisterUserDTO dto) {
        System.out.println("Register: " + dto);
    }
}
