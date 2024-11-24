package mouse.univ.backendapp.service.fill;

import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.components.FileManager;
import mouse.univ.backendapp.dto.product.ProductCreateDTO;
import mouse.univ.backendapp.dto.shop.ShopCreateDTO;
import mouse.univ.backendapp.service.history.HistoryDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DataReadService {

    private final JSONService jsonService;
    private final FileManager fileManager;
    public List<ProductCreateDTO> readProductsFromFile(String filename) {
        String data = fileManager.read(filename);
        return jsonService.readListOfItems(data, ProductCreateDTO.class);
    }

    public List<ShopCreateDTO> readShopsFromFile(String filename) {
        String data = fileManager.read(filename);
        return jsonService.readListOfItems(data, ShopCreateDTO.class);
    }

    public HistoryDTO readHistory(String filename) {
        String data = fileManager.read(filename);
        return jsonService.readItem(data, HistoryDTO.class);
    }
}
