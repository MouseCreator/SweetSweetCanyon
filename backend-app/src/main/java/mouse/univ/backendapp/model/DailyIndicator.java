package mouse.univ.backendapp.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "daily_indicators")
public class DailyIndicator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date;
    private String type;
    @ManyToOne
    @JoinColumn(name = "indicator_id")
    private ProductIndicator productIndicator;
}
