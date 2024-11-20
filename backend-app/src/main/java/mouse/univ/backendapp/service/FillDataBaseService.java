package mouse.univ.backendapp.service;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import mouse.univ.backendapp.components.FileService;
import mouse.univ.backendapp.model.LossReason;
import mouse.univ.backendapp.model.Supplier;
import mouse.univ.backendapp.repository.LossReasonRepository;
import mouse.univ.backendapp.repository.SupplierRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Function;

@Service
@AllArgsConstructor
public class FillDataBaseService {

    private final FileService fileService;
    private final SupplierRepository supplierRepository;
    private final LossReasonRepository lossReasonRepository;
    private <T> void fillWith(List<String> lines, JpaRepository<T, Long> repository, Function<String, T> mapper) {
        for (String line : lines) {
            T t = mapper.apply(line);
            if (t != null) {
                repository.save(t);
            }
        }
    }
    private void fillSuppliers() {
        List<String> linedFile = fileService.readLinedFile("resources/fill/Suppliers.txt");
        fillWith(linedFile, supplierRepository, line->new Supplier(null, line));
    }
    private void fillReasons() {
        List<String> linedFile = fileService.readLinedFile("resources/fill/Suppliers.txt");
        fillWith(linedFile, lossReasonRepository, line->new LossReason(null, line));
    }
    private boolean isFilled() {
        return supplierRepository.count() == 0L && lossReasonRepository.count() == 0L;
    }
    @PostConstruct
    public void fillDataBase() {
        if (isFilled()) {
            return;
        }
        fillSuppliers();
        fillReasons();
    }
}
