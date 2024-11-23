package mouse.univ.backendapp.builder;


import mouse.univ.backendapp.exception.BuilderException;
import mouse.univ.backendapp.model.Shop;
import mouse.univ.backendapp.model.Transaction;
import mouse.univ.backendapp.model.UsedProduct;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;

public class TransactionBuilder {

    private final Transaction transaction;

    public TransactionBuilder() {
        transaction = new Transaction();
        transaction.setPrice(new BigDecimal(0));
    }

    public Transaction get() {
        LocalDateTime now = LocalDateTime.now();

        if (transaction.getType()==null) {
            throw new BuilderException("Transaction has no type");
        }
        if (transaction.getUsername()==null) {
            throw new BuilderException("Transaction has no cashier");
        }
        if (transaction.getShop() == null) {
            throw new BuilderException("Transaction has no shop");
        }

        transaction.setDate(now);
        return transaction;
    }
    private TransactionBuilder type(String type) {
        transaction.setType(type);
        return this;
    }
    public TransactionBuilder sale() {
        return type("sale");
    }
    public TransactionBuilder loss() {
        return type("loss");
    }
    public TransactionBuilder supply() {
        return type("supply");
    }

    public TransactionBuilder shop(Shop shop) {
        transaction.setShop(shop);
        return this;
    }

    private BigDecimal calculateSum(Collection<UsedProduct> products) {
        BigDecimal sum = new BigDecimal(0);
        for (UsedProduct usedProduct : products) {
            BigDecimal price;
            price = usedProduct.getPrice();
            Long amount = usedProduct.getAmount();
            BigDecimal factor = price.multiply(new BigDecimal(amount));
            sum = sum.add(factor);
        }
        return sum;
    }
    public TransactionBuilder products(Collection<UsedProduct> products) {
        BigDecimal bigDecimal = calculateSum(products);
        transaction.setPrice(bigDecimal);
        transaction.setUsedProductList(new ArrayList<>(products));
        return this;
    }
    public TransactionBuilder username(String cashier) {
        transaction.setUsername(cashier);
        return this;
    }
}
