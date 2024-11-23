package mouse.univ.backendapp.mapper;

import mouse.univ.backendapp.dto.stock.StockResponseDTO;
import mouse.univ.backendapp.model.Stock;

public interface StockMapper {
    StockResponseDTO toResponse(Stock stock);
}
