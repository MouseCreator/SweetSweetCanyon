package mouse.univ.backendapp.service.transaction;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.dto.transaction.TransactionItem;
import mouse.univ.backendapp.dto.user.UserDetails;
import mouse.univ.backendapp.dto.user.UserRole;
import mouse.univ.backendapp.exception.*;
import mouse.univ.backendapp.model.Transaction;
import mouse.univ.backendapp.repository.TransactionRepository;
import mouse.univ.backendapp.service.StockService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final StockService stockService;
    private final TransactionRepository transactionRepository;
    public void validateIsCashier(UserDetails userDetails) {
        if (userDetails.getRole() != UserRole.CASHIER) {
            throw new ItemInvalidStateException("The user is not a cashier, but: " + userDetails.getRole());
        }
        if (userDetails.getAssociatedShopId() == null) {
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

    public boolean isEnoughItems(Long shopId, TransactionItem item) {
        Long desiredAmount = item.getAmount();
        Long productId = item.getProductId();
        Long availableNumber = stockService.getNumberOfProducts(shopId, productId);
        return desiredAmount <= availableNumber;
    }
    public void validateEnoughItems(Long shopId, List<TransactionItem> items) {
        if (items.isEmpty()) {
            throw new ItemInvalidStateException("Cannot perform a transaction: no items selected");
        }
        List<ProductFormSpecific> specifics = new ArrayList<>();

        for (TransactionItem item : items) {

            Long desiredAmount = item.getAmount();
            Long productId = item.getProductId();
            Long availableNumber = stockService.getNumberOfProducts(shopId, productId);

            if (desiredAmount > availableNumber) {
                ProductFormSpecific specific = new ProductFormSpecific();
                specific.setId(productId);
                String message = "None available";
                if (availableNumber > 0) {
                    message = "Only " + availableNumber + " available!";
                }
                specific.setMessage(message);
                specifics.add(specific);
            }
        }
        if (!specifics.isEmpty()) {
            ProductFormErrorDetails productFormErrorDetails = new ProductFormErrorDetails();
            productFormErrorDetails.setPrimaryError("Not enough products!");
            productFormErrorDetails.setProductSpecific(specifics);
            throw new ProductFormException(productFormErrorDetails);
        }
    }
    @Transactional
    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }
}
