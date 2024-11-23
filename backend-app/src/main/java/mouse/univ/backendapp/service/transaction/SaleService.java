package mouse.univ.backendapp.service.transaction;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.builder.TransactionBuilder;
import mouse.univ.backendapp.dto.sale.SaleCreateDTO;
import mouse.univ.backendapp.dto.sale.SaleResponseDTO;
import mouse.univ.backendapp.dto.transaction.TransactionItem;
import mouse.univ.backendapp.dto.user.UserDetails;
import mouse.univ.backendapp.exception.InternalNotFound;
import mouse.univ.backendapp.mapper.SaleMapper;
import mouse.univ.backendapp.model.Sale;
import mouse.univ.backendapp.model.Shop;
import mouse.univ.backendapp.model.Transaction;
import mouse.univ.backendapp.model.UsedProduct;
import mouse.univ.backendapp.repository.SaleRepository;
import mouse.univ.backendapp.repository.ShopRepository;
import mouse.univ.backendapp.service.UsedProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SaleService {

    private final TransactionService transactionService;
    private final SaleRepository saleRepository;
    private final UsedProductService usedProductService;
    private final SaleMapper saleMapper;
    private final ShopRepository shopRepository;
    @Transactional
    public SaleResponseDTO saleProducts(SaleCreateDTO saleCreateDTO, UserDetails userDetails) {
        Long shopId = userDetails.getAssociatedShopId();
        List<TransactionItem> items = saleCreateDTO.getItems();
        transactionService.validateEnoughItems(shopId, items);
        List<UsedProduct> usedProducts = usedProductService.useItems(items);
        Shop shop = shopRepository.findById(shopId).orElseThrow(() -> new InternalNotFound("shop", shopId));
        TransactionBuilder builder = new TransactionBuilder();

        Transaction transaction = builder.sale()
                .username(userDetails.getName())
                .products(usedProducts)
                .shop(shop)
                .get();
        Transaction savedTransaction = transactionService.saveTransaction(transaction);
        Sale sale = new Sale();
        sale.setTransaction(savedTransaction);
        Sale saved = save(sale);
        return saleMapper.toResponse(saved);
    }
    @Transactional
    public Sale save(Sale sale) {
        return saleRepository.save(sale);
    }


}
