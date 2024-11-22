package mouse.univ.backendapp.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import mouse.univ.backendapp.exception.DataNotFoundException;
import mouse.univ.backendapp.exception.DeleteOrderException;
import mouse.univ.backendapp.exception.NoStockException;
import mouse.univ.backendapp.model.Product;
import mouse.univ.backendapp.model.Shop;
import mouse.univ.backendapp.model.Stock;
import mouse.univ.backendapp.model.StockKey;
import mouse.univ.backendapp.repository.ProductRepository;
import mouse.univ.backendapp.repository.ShopRepository;
import mouse.univ.backendapp.repository.StockRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class StockService {
    private final StockRepository stockRepository;
    private final ShopRepository shopRepository;
    private final ProductRepository productRepository;

    private StockKey key(Long shopId, Long productId) {
        return new StockKey(shopId, productId);
    }
    public long getNumberOfProducts(Long shop, Long product) {
        StockKey key = key(shop, product);
        Optional<Stock> stockOptional = stockRepository.findById(key);
        Stock stock = stockOptional.orElseThrow(() -> new NoStockException(shop, product));
        return stock.getAmount();
    }
    @Transactional
    public Stock initializeStock(Long shopId, Long productId) {
        Stock stock = new Stock();
        StockKey key = key(shopId, productId);
        stock.setAmount(0L);

        Optional<Shop> shopById = shopRepository.findById(shopId);
        Shop shop = shopById.orElseThrow(()->new DataNotFoundException("Cannot find shop with id " + shopId));

        Optional<Product> productById = productRepository.findById(shopId);
        Product product = productById.orElseThrow(()->new DataNotFoundException("Cannot find product with id " + productId));

        stock.setProduct(product);
        stock.setShop(shop);
        stock.setId(key);
        return stockRepository.save(stock);
    }
    @Transactional
    public void deleteAllByShop(Long id) {
        Optional<Shop> shopOptional = shopRepository.findById(id);
        Shop shop = shopOptional.orElseThrow(() -> new DeleteOrderException("Cannot find shop with id " + id));
        stockRepository.deleteAllByShop(shop);
    }
    @Transactional
    public void initializeShop(Long shopId) {
        List<Product> all = productRepository.findAll();
        for (Product product : all) {
            Long productId = product.getId();
            initializeStock(shopId, productId);
        }

    }
    @Transactional
    public void deleteAllByProduct(Long id) {
        Optional<Product> productOptional = productRepository.findById(id);
        Product product = productOptional.orElseThrow(() -> new DeleteOrderException("Cannot find product with id " + id));
        stockRepository.deleteAllByProduct(product);
    }
    @Transactional
    public void initializeProduct(Long productId) {
        List<Shop> all = shopRepository.findAll();
        for (Shop shop : all) {
            Long shopId = shop.getId();
            initializeStock(shopId, productId);
        }

    }
}
