package mouse.univ.backendapp.service.transaction;

import jakarta.persistence.Column;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.dto.cashier.CashierDetails;
import mouse.univ.backendapp.dto.transaction.TransactionItem;
import mouse.univ.backendapp.exception.ItemInvalidStateException;
import mouse.univ.backendapp.exception.NotEnoughProductsException;
import mouse.univ.backendapp.model.Transaction;
import mouse.univ.backendapp.repository.TransactionRepository;
import mouse.univ.backendapp.service.StockService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final StockService stockService;
    private final TransactionRepository transactionRepository;
    public void validateCashier(CashierDetails cashierDetails) {
        if (cashierDetails.getShopId() == null) {
            throw new ItemInvalidStateException("Cashier does not have a shop selected. Cannot do perform a transaction");
        }
    }
    public void validateEnoughItems(Long shopId, TransactionItem item) {
        Long desiredAmount = item.getAmount();
        Long productId = item.getProductId();
        Long availableNumber = stockService.getNumberOfProducts(shopId, productId);
        if (desiredAmount > availableNumber) {
            throw new NotEnoughProductsException(desiredAmount, availableNumber);
        }
    }
    public void validateEnoughItems(Long shopId, List<TransactionItem> items) {
        if (items.isEmpty()) {
            throw new ItemInvalidStateException("Cannot perform a transaction: no items selected");
        }
        for (TransactionItem item : items) {
            validateEnoughItems(shopId, item);
        }
    }
    @Transactional
    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }
}
