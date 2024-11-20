package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
}
