package mouse.univ.backendapp.model;

import jakarta.persistence.*;
import lombok.Data;
import mouse.univ.backendapp.model.prototype.CommonIndicator;

import java.time.LocalDate;
@Data
@Entity
@Table(name = "monthly_indicators")
public class MonthlyIndicator implements CommonIndicator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Temporal(TemporalType.DATE)
    private LocalDate date;
    private String type;
    @ManyToOne
    @JoinColumn(name = "indicator_id")
    private ProductIndicator productIndicator;
}
