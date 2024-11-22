package mouse.univ.backendapp.service.fill;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import mouse.univ.backendapp.components.FileService;
import mouse.univ.backendapp.dto.product.ProductCreateDTO;
import mouse.univ.backendapp.dto.shop.ShopCreateDTO;
import mouse.univ.backendapp.model.LossReason;
import mouse.univ.backendapp.model.Supplier;
import mouse.univ.backendapp.repository.LossReasonRepository;
import mouse.univ.backendapp.repository.SupplierRepository;
import mouse.univ.backendapp.service.ProductService;
import mouse.univ.backendapp.service.ShopService;
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
    private final ProductService productService;
    private final DataReadService readService;
    private final ShopService shopService;

    private final static String FILL_DIR = "src/main/resources/fill/";
    private <T> void fillWith(List<String> lines, JpaRepository<T, Long> repository, Function<String, T> mapper) {
        for (String line : lines) {
            T t = mapper.apply(line);
            if (t != null) {
                repository.save(t);
            }
        }
    }
    private void fillSuppliers() {
        List<String> linedFile = fileService.readLinedFile(FILL_DIR+"Suppliers.txt");
        fillWith(linedFile, supplierRepository, line->new Supplier(null, line));
    }
    private void fillReasons() {
        List<String> linedFile = fileService.readLinedFile(FILL_DIR+"Reasons.txt");
        fillWith(linedFile, lossReasonRepository, line->new LossReason(null, line));
    }

    private void addProducts(FillCounter counter) {
        List<ProductCreateDTO> products = readService.readProductsFromFile(FILL_DIR+"products.json");
        for (ProductCreateDTO productCreateDTO : products) {
            if (productService.existsByName(productCreateDTO.getName()))
                continue;
            productService.createProduct(productCreateDTO);
            counter.increment();
        }
    }
    private void addShops(FillCounter counter) {
        List<ShopCreateDTO> shops = readService.readShopsFromFile(FILL_DIR+"shops.json");
        for (ShopCreateDTO createDTO : shops) {
            if (shopService.existsByName(createDTO.getName()))
                continue;
            shopService.createShop(createDTO);
            counter.increment();
        }
    }
    private boolean isFilled() {
        return supplierRepository.count() > 0L && lossReasonRepository.count() > 0L;
    }
    @PostConstruct
    public void fillDataBase() {
        if (isFilled()) {
            return;
        }
        fillSuppliers();
        fillReasons();
    }
    @Transactional
    public int addOnRequest() {
        FillCounter counter = new FillCounter();
        addProducts(counter);
        addShops(counter);
        return counter.get();
    }


}
