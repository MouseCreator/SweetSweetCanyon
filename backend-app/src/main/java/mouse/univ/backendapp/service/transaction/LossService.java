package mouse.univ.backendapp.service.transaction;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.builder.TransactionBuilder;
import mouse.univ.backendapp.dto.user.UserDetails;
import mouse.univ.backendapp.exception.InternalNotFound;
import mouse.univ.backendapp.model.*;
import mouse.univ.backendapp.repository.*;
import mouse.univ.backendapp.service.UsedProductService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LossService {

    private final UsedProductService usedProductService;
    private final StockRepository stockRepository;
    private final ShopRepository shopRepository;
    private final ProductRepository productRepository;
    private final LossReasonRepository lossReasonRepository;
    private final LossRepository lossRepository;
    @Transactional
    public Optional<Loss> loseEverythingInShop(Long shopId, UserDetails userDetails) {
        List<Stock> stocksByShop = getStocksByShop(shopId);
        Shop shop = shopRepository.findById(shopId).orElseThrow(() -> new InternalNotFound("shod", shopId));
        Transaction transaction = transactionFromStocks(userDetails.getName(), stocksByShop, shop);
        if (transaction.isEmpty()) {
            return Optional.empty();
        }
        Loss loss = new Loss();
        LossReason reason = lossReasonRepository.findByTitle("Closing shop").orElseThrow(InternalNotFound::new);
        loss.setReason(reason);
        loss.setComment(null);
        loss.setTransaction(transaction);

        return Optional.of(lossRepository.save(loss));
    }

    private List<Stock> getStocksByShop(Long shopId) {
        Shop shop = shopRepository.findById(shopId).orElseThrow(() -> new InternalNotFound("shop", shopId));
        return stockRepository.findAllByShop(shop);
    }
    private List<Stock> getStocksByProduct(Long productId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new InternalNotFound("product", productId));
        return stockRepository.findAllByProduct(product);
    }
    @Transactional
    public List<Loss> loseEveryProductWithId(Long productId, UserDetails userDetails) {
        List<Stock> stocksByShop = getStocksByShop(productId);
        List<Shop> allShops = shopRepository.findAll();
        List<Loss> result = new ArrayList<>();
        for (Shop shop : allShops) {
            Transaction transaction = transactionFromStocks(userDetails.getName(), stocksByShop, shop);
            if (transaction.isEmpty()) {
                continue;
            }
            Loss loss = new Loss();
            LossReason reason = lossReasonRepository.findByTitle("Removing product").orElseThrow(InternalNotFound::new);
            loss.setReason(reason);
            loss.setComment(null);
            loss.setTransaction(transaction);
            Loss saved = lossRepository.save(loss);
            result.add(saved);
        }
        return result;

    }

    private Transaction transactionFromStocks(String userName, List<Stock> stocksByShop, Shop shop) {
        TransactionBuilder builder = new TransactionBuilder();
        List<UsedProduct> usedProducts = new ArrayList<>();
        for (Stock stock : stocksByShop) {
            UsedProduct usedProduct = usedProductService.useProduct(stock.getProduct(), stock.getAmount());
            usedProducts.add(usedProduct);
        }
        return builder.loss().username(userName).products(usedProducts).shop(shop).get();
    }
}
