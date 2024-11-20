package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
