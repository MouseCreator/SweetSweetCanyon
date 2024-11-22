package mouse.univ.backendapp.service.transaction;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.builder.TransactionBuilder;
import mouse.univ.backendapp.dto.cashier.CashierDetails;
import mouse.univ.backendapp.dto.sale.SaleCreateDTO;
import mouse.univ.backendapp.dto.sale.SaleResponseDTO;
import mouse.univ.backendapp.dto.transaction.TransactionItem;
import mouse.univ.backendapp.mapper.SaleMapper;
import mouse.univ.backendapp.model.Sale;
import mouse.univ.backendapp.model.Transaction;
import mouse.univ.backendapp.model.UsedProduct;
import mouse.univ.backendapp.repository.SaleRepository;
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
    @Transactional
    public SaleResponseDTO saleProducts(SaleCreateDTO saleCreateDTO, CashierDetails cashierDetails) {
        transactionService.validateCashier(cashierDetails);
        Long shopId = cashierDetails.getShopId();
        List<TransactionItem> items = saleCreateDTO.getItems();
        transactionService.validateEnoughItems(shopId, items);
        List<UsedProduct> usedProducts = usedProductService.useItems(items);

        TransactionBuilder builder = new TransactionBuilder();

        Transaction transaction = builder.sale().cashier(cashierDetails.getName()).products(usedProducts).get();
        Sale sale = new Sale();
        sale.setTransaction(transaction);
        Sale saved = save(sale);
        return saleMapper.toResponse(saved);
    }
    @Transactional
    public Sale save(Sale sale) {
        return saleRepository.save(sale);
    }


}
