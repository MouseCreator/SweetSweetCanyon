package mouse.univ.backendapp.repository;

import mouse.univ.backendapp.model.UserBind;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserBindRepository extends JpaRepository<UserBind, String> {
    @Query("delete from UserBind u where u.user.id = :userId")
    void deleteByUser(@Param("userId") Long userId);
}
