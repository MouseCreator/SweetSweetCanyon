package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.UserContacts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactsRepository extends JpaRepository<UserContacts, Long> {
}
