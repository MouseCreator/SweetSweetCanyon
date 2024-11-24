package mouse.univ.backendapp.service.history;

import jakarta.transaction.Transactional;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.dto.loss.LossCreateDTO;
import mouse.univ.backendapp.dto.sale.SaleCreateDTO;
import mouse.univ.backendapp.dto.supply.SupplyCreateDTO;
import mouse.univ.backendapp.dto.transaction.TransactionItem;
import mouse.univ.backendapp.dto.user.UserDetails;
import mouse.univ.backendapp.dto.user.UserRole;
import mouse.univ.backendapp.model.LossReason;
import mouse.univ.backendapp.model.Product;
import mouse.univ.backendapp.model.Shop;
import mouse.univ.backendapp.model.Supplier;
import mouse.univ.backendapp.repository.LossReasonRepository;
import mouse.univ.backendapp.repository.ProductRepository;
import mouse.univ.backendapp.repository.ShopRepository;
import mouse.univ.backendapp.repository.SupplierRepository;
import mouse.univ.backendapp.service.transaction.LossService;
import mouse.univ.backendapp.service.transaction.SaleService;
import mouse.univ.backendapp.service.transaction.SupplyService;
import mouse.univ.backendapp.service.util.RandomService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class HistoryGenerator {

    private final ProductRepository productRepository;
    private final ShopRepository shopRepository;
    private final RandomService randomService;
    private final LossService lossService;
    private final SupplierRepository supplierRepository;
    private final SupplyService supplyService;
    private final SaleService saleService;
    private final LossReasonRepository lossReasonRepository;
    @Transactional
    public void generateHistory(HistoryParams historyParams) {
        List<Product> products = productRepository.findAll();
        List<Shop> shops = shopRepository.findAll();
        List<LossReason> lossReasons = lossReasonRepository.findAll();
        List<Supplier> allSuppliers = supplierRepository.findAll();
        for (Shop shop : shops) {
            generateForShop(shop, products, lossReasons, allSuppliers, historyParams);
        }
    }
    @Data
    public static class ProductAmount {
        private Long productId;
        private Long amount;
    }
    public static class LocalStorage {
        private final Map<Long, ProductAmount> amounts;

        public LocalStorage() {
            amounts = new HashMap<>();
        }

        public void init(List<Product> products) {
            for (Product product : products) {
                ProductAmount amount = new ProductAmount();
                amount.setAmount(0L);
                amount.setProductId(product.getId());
                amounts.put(product.getId(), amount);
            }
        }

        public Long getAmount(Product toSale) {
            return amounts.get(toSale.getId()).amount;
        }

        public List<ProductAmount> asList() {
            return new ArrayList<>(amounts.values());
        }

        public void add(Long id, long amount) {
            ProductAmount prev = amounts.get(id);
            prev.setAmount(prev.amount + amount);
        }
        public void subtract(Long id, long amount) {
            ProductAmount prev = amounts.get(id);
            prev.setAmount(prev.amount - amount);
        }
    }
    @Transactional
    protected void generateForShop(Shop shop,
                                   List<Product> products,
                                   List<LossReason> reasons,
                                   List<Supplier> suppliers,
                                   HistoryParams historyParams) {
        LocalDateTime firstDay = historyParams.getFirstDay();
        LocalDateTime lastDay = historyParams.getLastDay();


        firstDay = firstDay.withHour(0).withMinute(0).withSecond(0);
        lastDay = lastDay.withHour(23).withMinute(59).withSecond(59);
        LocalDateTime currentDay = firstDay;

        Long sellDaily = historyParams.getSellDaily();
        Long loseDaily = historyParams.getLossDaily();
        Long supplyDaily = historyParams.getSupplyDaily();

        LocalStorage storage = new LocalStorage();
        storage.init(products);
        while (!currentDay.isAfter(lastDay)) {
            long supplied = 0L;
            while (supplied < supplyDaily){
                supplied += supplyProduct(shop, products, suppliers, storage, currentDay);
            }
            long sold = 0L;
            while (sold < sellDaily) {
                long si = sellProduct(shop, products, storage, currentDay);
                if (si==0) {
                    break;
                }
                sold += si;
            }
            long lost = 0L;
            while (lost < loseDaily) {
                long si = loseProduct(shop, products, reasons, storage, currentDay);
                if (si==0) {
                    break;
                }
                lost += si;
            }
            currentDay = currentDay.plusDays(1);
        }
    }
    @Transactional
    protected long sellProduct(Shop shop, List<Product> products, LocalStorage storage, LocalDateTime currentDay) {
        LocalDateTime time = dayTime(currentDay);
        UserDetails userDetails = getCashier(shop);
        Optional<Product> toSaleOpt = chooseToSaleOrLose(products, storage);
        if (toSaleOpt.isEmpty()) {
            return 0;
        }
        Product toSale = toSaleOpt.get();
        long amount = deviation(1L, 6L);
        amount = Math.min(amount, storage.getAmount(toSale));
        SaleCreateDTO saleCreateDTO = new SaleCreateDTO();
        TransactionItem transactionItem = new TransactionItem(toSale.getId(), amount);
        saleCreateDTO.setItems(List.of(transactionItem));
        saleService.saleAtTime(saleCreateDTO, userDetails, time);
        storage.subtract(toSale.getId(), amount);
        return amount;
    }

    @Transactional
    protected long loseProduct(Shop shop, List<Product> products, List<LossReason> lossReasons, LocalStorage storage, LocalDateTime currentDay) {
        LocalDateTime time = eveningTime(currentDay);
        UserDetails userDetails = getCashier(shop);
        Optional<Product> toLoseOpt = chooseToSaleOrLose(products, storage);
        if (toLoseOpt.isEmpty()) {
            return 0;
        }
        Product toLose = toLoseOpt.get();
        long amount = deviation(1L, 8L);
        amount = Math.min(amount, storage.getAmount(toLose));
        LossCreateDTO lossCreateDTO = new LossCreateDTO();
        TransactionItem transactionItem = new TransactionItem(toLose.getId(), amount);
        lossCreateDTO.setItems(List.of(transactionItem));
        lossCreateDTO.setComment("");
        LossReason reason = pickRandom(lossReasons);
        lossCreateDTO.setReasonId(reason.getId());
        lossService.loseAtTime(lossCreateDTO, userDetails, time);
        storage.subtract(toLose.getId(), amount);
        return amount;
    }



    @Transactional
    protected long supplyProduct(Shop shop, List<Product> products, List<Supplier> suppliers, LocalStorage storage, LocalDateTime currentDay) {
        LocalDateTime time = morningTime(currentDay);
        UserDetails userDetails = getCashier(shop);
        long amount = deviation(5L, 15L);
        Optional<Product> toSupplyOpt = chooseToSupply(products, storage);
        if (toSupplyOpt.isEmpty()) {
            return 0L;
        }
        Product toSupply = toSupplyOpt.get();
        Supplier supplier = pickRandom(suppliers);

        SupplyCreateDTO supplyCreateDTO = new SupplyCreateDTO();
        TransactionItem transactionItem = new TransactionItem(toSupply.getId(), amount);
        supplyCreateDTO.setItems(List.of(transactionItem));
        supplyCreateDTO.setSupplierName("Supplier");
        supplyCreateDTO.setSupplierId(supplier.getId());
        supplyService.supplyAtTime(supplyCreateDTO, userDetails, time);
        storage.add(toSupply.getId(), amount);
        return amount;
    }

    private <T> T pickRandom(List<T> suppliers) {
        int i = randomService.rand().nextInt(suppliers.size());
        return suppliers.get(i);
    }

    private Optional<Product> chooseToSupply(List<Product> products, LocalStorage storage) {
        if (products.isEmpty()) {
            return Optional.empty();
        }
        List<ProductAmount> list = storage.asList();
        list.sort((e1, e2) -> (int) (e1.amount - e2.amount));
        int top = Math.min(list.size(), 5);
        int index = randomService.rand().nextInt(top);
        ProductAmount amount = list.get(index);
        Long productId = amount.getProductId();
        return products.stream().filter(p->p.getId().equals(productId)).findFirst();
    }

    private Optional<Product> chooseToSaleOrLose(List<Product> products, LocalStorage storage) {
        if (products.isEmpty()) {
            return Optional.empty();
        }
        List<ProductAmount> list = storage.asList();
        list.sort((e1, e2) -> (int) (e2.amount - e1.amount));
        if (list.getFirst().amount == 0) {
            return Optional.empty();
        }
        int top = Math.min(list.size(), 5);
        int index = randomService.rand().nextInt(top);
        ProductAmount amount = list.get(index);
        Long productId = amount.getProductId();
        return products.stream().filter(p->p.getId().equals(productId)).findFirst();
    }

    private UserDetails getCashier(Shop shop) {
        UserDetails userDetails = new UserDetails();
        userDetails.setRole(UserRole.CASHIER);
        userDetails.setName("Cashier");
        userDetails.setAssociatedShopId(shop.getId());
        return userDetails;
    }

    private LocalDateTime morningTime(LocalDateTime baseTime) {
        int hour = randomService.rand().nextInt(8, 11);
        int minute = randomService.rand().nextInt(0, 60);
        return baseTime.withHour(hour).withMinute(minute);
    }

    private LocalDateTime dayTime(LocalDateTime baseTime) {
        int hour = randomService.rand().nextInt(12, 18);
        int minute = randomService.rand().nextInt(0, 60);
        return baseTime.withHour(hour).withMinute(minute);
    }

    private LocalDateTime eveningTime(LocalDateTime currentDay) {
        int hour = randomService.rand().nextInt(18, 20);
        int minute = randomService.rand().nextInt(0, 60);
        return currentDay.withHour(hour).withMinute(minute);
    }

    private long deviation(Long min, Long max) {
        return randomService.rand().nextLong(min, max);
    }
}
