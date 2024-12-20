package mouse.univ.backendapp.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import mouse.univ.backendapp.dto.stock.StockResponseDTO;
import mouse.univ.backendapp.dto.transaction.TransactionItem;
import mouse.univ.backendapp.exception.DataNotFoundException;
import mouse.univ.backendapp.exception.DeleteOrderException;
import mouse.univ.backendapp.exception.ItemInvalidStateException;
import mouse.univ.backendapp.exception.NoStockException;
import mouse.univ.backendapp.mapper.StockMapper;
import mouse.univ.backendapp.model.Product;
import mouse.univ.backendapp.model.Shop;
import mouse.univ.backendapp.model.Stock;
import mouse.univ.backendapp.model.StockKey;
import mouse.univ.backendapp.repository.ProductRepository;
import mouse.univ.backendapp.repository.ShopRepository;
import mouse.univ.backendapp.repository.StockRepository;
import org.springframework.stereotype.Service;


import java.util.*;

@Service
@AllArgsConstructor
public class StockService {
    private final StockRepository stockRepository;
    private final ShopRepository shopRepository;
    private final ProductRepository productRepository;
    private final StockMapper stockMapper;

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

        Optional<Product> productById = productRepository.findById(productId);
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
            if (stockRepository.existsById(new StockKey(shopId, productId))) {
                continue;
            }
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
            if (stockRepository.existsById(new StockKey(shopId, productId))) {
                continue;
            }
            initializeStock(shopId, productId);
        }
    }

    public List<StockResponseDTO> findByNameAndShop(String name, Long shopId) {
        List<Stock> allStocks;
        if (shopId == null) {
            if (name == null || name.isEmpty()) {
                allStocks = stockRepository.findAll();
            } else {
                allStocks = stockRepository.findAllByName(name);
            }
        }
        else if (name == null || name.isEmpty()) {
            Shop shop = shopRepository.findById(shopId)
                    .orElseThrow(() -> new DataNotFoundException("No shop with id " + shopId));
            allStocks = stockRepository.findAllByShop(shop);
        } else {
            allStocks = stockRepository.findAllByNameAndShop(name, shopId);
        }
        return allStocks.stream().map(stockMapper::toResponse).toList();
    }

    public List<Stock> findAllByShop(Shop shop) {
        return stockRepository.findAllByShop(shop);
    }

    public List<Stock> findAllByProduct(Product product) {
        return stockRepository.findAllByProduct(product);
    }
    @Transactional
    public void addAllToStocks(Long shopId, Collection<TransactionItem> items) {
        for (TransactionItem item : items) {
            addToStocks(shopId, item.getProductId(), item.getAmount());
        }
    }
    @Transactional
    public void subtractAllFromStocks(Long shopId, Collection<TransactionItem> items) {
        for (TransactionItem item : items) {
            subtractFromStocks(shopId, item.getProductId(), item.getAmount());
        }
    }
    @Transactional
    public void addToStocks(Long shopId, Long productId, Long amount) {
        modifyStocks(shopId, productId, amount);
    }
    @Transactional
    public void subtractFromStocks(Long shopId, Long productId, Long amount) {
        modifyStocks(shopId, productId, -amount);
    }
    @Transactional
    protected void modifyStocks(Long shopId, Long productId, Long byAmount) {
        StockKey stockKey = new StockKey(shopId, productId);
        Stock stock = stockRepository.findById(stockKey).orElseThrow(()->new NoStockException(shopId, productId));
        stock.setAmount(stock.getAmount()+byAmount);
        if (stock.getAmount() < 0) {
            throw new ItemInvalidStateException("Cannot save stock with negative amount");
        }
        stockRepository.save(stock);
    }

}
