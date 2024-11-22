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
    public UsedProduct useProduct(Product product, Long amount) {
        String name = product.getName();
        BigDecimal price = product.getPrice();
        UsedProduct usedProduct = new UsedProduct();
        usedProduct.setAmount(amount);
        usedProduct.setPrice(price);
        usedProduct.setReference(product);
        usedProduct.setName(name);
        return usedProductRepository.save(usedProduct);
    }
    @Transactional
    public UsedProduct useItem(TransactionItem transactionItem) {
        Long productId = transactionItem.getProductId();
        Long amount = transactionItem.getAmount();
        Optional<Product> productOpt = productRepository.findById(productId);
        Product product = productOpt.orElseThrow(() -> new InternalNotFound("product", productId));
        return useProduct(product, amount);
    }
    @Transactional
    public List<UsedProduct> useItems(Collection<TransactionItem> items) {
        return items.stream().map(this::useItem).toList();
    }

}
