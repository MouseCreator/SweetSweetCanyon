package mouse.univ.backendapp.service.transaction;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.builder.TransactionBuilder;
import mouse.univ.backendapp.dto.loss.LossCreateDTO;
import mouse.univ.backendapp.dto.loss.LossResponseDTO;
import mouse.univ.backendapp.dto.transaction.TransactionItem;
import mouse.univ.backendapp.dto.user.UserDetails;
import mouse.univ.backendapp.exception.DataNotFoundException;
import mouse.univ.backendapp.exception.InternalNotFound;
import mouse.univ.backendapp.mapper.LossMapper;
import mouse.univ.backendapp.model.*;
import mouse.univ.backendapp.repository.*;
import mouse.univ.backendapp.service.StockService;
import mouse.univ.backendapp.service.UsedProductService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LossService {

    private final UsedProductService usedProductService;
    private final StockService stockService;
    private final ShopRepository shopRepository;
    private final ProductRepository productRepository;
    private final LossReasonRepository lossReasonRepository;
    private final LossRepository lossRepository;
    private final TransactionService transactionService;
    private final LossMapper lossMapper;
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
        return stockService.findAllByShop(shop);
    }
    private List<Stock> getStocksByProduct(Long productId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new InternalNotFound("product", productId));
        return stockService.findAllByProduct(product);
    }
    @Transactional
    public List<Loss> loseEveryProductWithId(Long productId, UserDetails userDetails) {
        List<Stock> stocksByShop = getStocksByProduct(productId);
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
    @Transactional
    public LossResponseDTO loseProducts(LossCreateDTO lossCreateDTO, UserDetails userDetails) {
        Long shopId = userDetails.getAssociatedShopId();
        List<TransactionItem> items = lossCreateDTO.getItems();
        transactionService.validateEnoughItems(shopId, items);
        List<UsedProduct> usedProducts = usedProductService.loseItems(items);
        Shop shop = shopRepository.findById(shopId).orElseThrow(() -> new InternalNotFound("shop", shopId));
        TransactionBuilder builder = new TransactionBuilder();

        Transaction transaction = builder.loss()
                .username(userDetails.getName())
                .products(usedProducts)
                .shop(shop)
                .get();
        Transaction savedTransaction = transactionService.saveTransaction(transaction);
        stockService.subtractAllFromStocks(shopId, items);
        Long reasonId = lossCreateDTO.getReasonId();
        LossReason reason = lossReasonRepository.findById(reasonId).orElseThrow(() -> new InternalNotFound("reason", reasonId));


        Loss loss = new Loss();
        loss.setTransaction(savedTransaction);
        loss.setComment(lossCreateDTO.getComment());

        loss.setReason(reason);
        Loss saved = lossRepository.save(loss);
        return lossMapper.map(saved);
    }

    private Transaction transactionFromStocks(String userName, List<Stock> stocksByShop, Shop shop) {
        TransactionBuilder builder = new TransactionBuilder();
        List<UsedProduct> usedProducts = new ArrayList<>();
        for (Stock stock : stocksByShop) {
            UsedProduct usedProduct = usedProductService.loseProduct(stock.getProduct(), stock.getAmount());
            usedProducts.add(usedProduct);
        }
        return builder.loss().username(userName).products(usedProducts).shop(shop).get();
    }

    public LossResponseDTO getLossById(Long id) {
        Optional<Loss> byId = lossRepository.findById(id);
        Loss loss = byId.orElseThrow(() -> new DataNotFoundException("Cannot find loss №" + byId));
        return lossMapper.map(loss);
    }
}
