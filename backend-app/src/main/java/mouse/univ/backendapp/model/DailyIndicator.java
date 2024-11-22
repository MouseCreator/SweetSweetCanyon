package mouse.univ.backendapp.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "daily_indicators")
public class DailyIndicator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime date;
    private String type;
    @ManyToOne
    @JoinColumn(name = "indicator_id")
    private ProductIndicator productIndicator;
}
