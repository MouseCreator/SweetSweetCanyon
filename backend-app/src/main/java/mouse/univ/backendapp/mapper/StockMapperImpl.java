package mouse.univ.backendapp.mapper;

import mouse.univ.backendapp.dto.product.ProductResponseDTO;
import mouse.univ.backendapp.dto.shop.ShopResponseDTO;
import mouse.univ.backendapp.dto.stock.StockResponseDTO;

import mouse.univ.backendapp.model.Stock;
import org.springframework.stereotype.Service;


@Service
public class StockMapperImpl implements StockMapper {
    private final ProductMapper productMapper;

    public StockMapperImpl(ProductMapper productMapper) {
        this.productMapper = productMapper;
    }

    @Override
    public StockResponseDTO toResponse(Stock stock) {
        Long amount = stock.getAmount();
        ProductResponseDTO product = productMapper.toResponseDTO(stock.getProduct());
        Long shop = stock.getShop().getId();

        StockResponseDTO responseDTO = new StockResponseDTO();
        responseDTO.setShopId(shop);
        responseDTO.setAmount(amount);
        responseDTO.setProduct(product);

        return responseDTO;
    }

}
