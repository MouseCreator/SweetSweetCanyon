package mouse.univ.backendapp.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.dto.transaction.TransactionItem;
import mouse.univ.backendapp.exception.InternalNotFound;
import mouse.univ.backendapp.model.Product;
import mouse.univ.backendapp.model.UsedProduct;
import mouse.univ.backendapp.repository.ProductRepository;
import mouse.univ.backendapp.repository.UsedProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UsedProductService {
    private final UsedProductRepository usedProductRepository;
    private final ProductRepository productRepository;
    @Transactional
    protected UsedProduct useProduct(Product product, Long amount, boolean supply) {
        String name = product.getName();
        BigDecimal price = supply ? product.getDeliveryPrice() : product.getPrice();
        UsedProduct usedProduct = new UsedProduct();
        usedProduct.setAmount(amount);
        usedProduct.setPrice(price);
        usedProduct.setReference(product);
        usedProduct.setName(name);
        return usedProductRepository.save(usedProduct);
    }

    @Transactional
    public UsedProduct loseProduct(Product product, Long amount) {
        return useProduct(product, amount, false);
    }
    @Transactional
    protected UsedProduct useItem(TransactionItem transactionItem, boolean supply) {
        Long productId = transactionItem.getProductId();
        Long amount = transactionItem.getAmount();
        Optional<Product> productOpt = productRepository.findById(productId);
        Product product = productOpt.orElseThrow(() -> new InternalNotFound("product", productId));
        return useProduct(product, amount, supply);
    }
    @Transactional
    protected List<UsedProduct> useItems(Collection<TransactionItem> items, boolean supply) {
        return items.stream().map(i->useItem(i, supply)).toList();
    }

    @Transactional
    public List<UsedProduct> supplyItems(Collection<TransactionItem> items) {
        return useItems(items, true);
    }
    @Transactional
    public List<UsedProduct> loseItems(Collection<TransactionItem> items) {
        return useItems(items, false);
    }
    @Transactional
    public List<UsedProduct> saleItems(Collection<TransactionItem> items) {
        return useItems(items, false);
    }
    @Transactional
    public List<UsedProduct> moveItems(List<TransactionItem> items) {
        return useItems(items, false);
    }
}
