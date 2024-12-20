package mouse.univ.backendapp.service.indicator;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.dto.indicator.DateIndicatorDTO;
import mouse.univ.backendapp.dto.indicator.StaticIndicatorDTO;
import mouse.univ.backendapp.model.*;
import mouse.univ.backendapp.model.prototype.CommonIndicator;
import mouse.univ.backendapp.repository.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IndicatorService {

    private final DailyIndicatorRepository dailyIndicatorRepository;
    private final MonthlyIndicatorRepository monthlyIndicatorRepository;
    private final ProductIndicatorRepository productIndicatorRepository;
    private final ShopRepository shopRepository;

    private final SaleRepository saleRepository;
    private final LossRepository lossRepository;
    private final SupplyRepository supplyRepository;
    @Transactional
    public void pointerRoutine(LocalDateTime currentDate, LocalDateTime minDate) {
        LocalDate now = currentDate.toLocalDate();
        LocalDate date = minDate.toLocalDate();
        List<Shop> shops = shopRepository.findAll();
        while (date.isBefore(now)) {
            if (date.getDayOfMonth() == 1) {
                createAllForMonth(date);
                createForShopsMonth(date, shops);
            }
            createAllForDate(date);
            createForShopsDate(date, shops);
            date = date.plusDays(1L);
        }
    }
    @Transactional
    protected void createForShopsMonth(LocalDate date, List<Shop> shops) {
        for (Shop shop : shops) {
            createAllForMonthShop(date, shop);
        }
    }

    @Transactional
    protected void createForShopsDate(LocalDate date, List<Shop> shops) {
        for (Shop shop : shops) {
            createAllForDateAndShop(date, shop);
        }
    }

    @Transactional
    protected void createAllForDateAndShop(LocalDate localDate, Shop shop) {
        for (IndType type : Indications.all()) {
            switch (type) {
                case IndType.LOSS -> createLossShop(shop,localDate);
                case IndType.REVENUE -> createRevenueShop(shop,localDate);
                case IndType.SALE -> createSaleShop(shop,localDate);
                case IndType.SUPPLY -> createSupplyShop(shop,localDate);
            }
        }
    }

    @Transactional
    protected void createAllForMonthShop(LocalDate localDate, Shop shop) {
        for (IndType type : Indications.all()) {
            switch (type) {
                case IndType.LOSS -> creteMonthlyLossShop(shop, localDate);
                case IndType.REVENUE -> createMonthlyRevenueShop(shop, localDate);
                case IndType.SALE -> createMonthlySaleShop(shop, localDate);
                case IndType.SUPPLY -> createMonthlySupplyShop(shop, localDate);
            }
        }
    }

    public List<DateIndicatorDTO> getAllDaily(LocalDate start, LocalDate end, Long shopId, String type) {
        List<DailyIndicator> dailyIndicators;
        dailyIndicators = getDailyIndicators(start, end, shopId, type);
        return toResponseList(dailyIndicators);
    }

    private List<DailyIndicator> getDailyIndicators(LocalDate start, LocalDate end, Long shopId, String type) {
        List<DailyIndicator> dailyIndicators;
        if (shopId == null) {
            dailyIndicators = dailyIndicatorRepository.findBetweenGlobalAndType(start, end, type);
        } else {
            dailyIndicators = dailyIndicatorRepository.findBetweenShopAndType(start, end, type, shopId);
        }
        return dailyIndicators;
    }

    public StaticIndicatorDTO getStaticResponse(LocalDate start, LocalDate end, Long shopId, String type) {
        IndSums indSums = new IndSums();
        if (shouldUseDailyIndicatorsForReport(start, end)) {
            List<DailyIndicator> dailyIndicators = getDailyIndicators(start, end, shopId, type);
            sumOfIndicators(dailyIndicators, indSums);
            return toStaticIndicator(shopId, indSums);
        }
        LocalDate afterStart;
        if (start.getDayOfMonth() == 1) {
            afterStart = start;
        } else {
            afterStart = lastDayOfMonth(start);
        }
        LocalDate beforeEnd = lastDayOfPreviousMonth(end);
        List<DailyIndicator> firstMonth = List.of();
        List<DailyIndicator> endMonth = List.of();
        if (start != afterStart) {
            firstMonth = getDailyIndicators(start, afterStart, shopId, type);
        }
        if (beforeEnd != end) {
            endMonth = getDailyIndicators(beforeEnd, end, shopId, type);
        }
        List<MonthlyIndicator> monthlyIndicators = getMonthlyIndicators(afterStart, beforeEnd, shopId, type);
        sumOfIndicators(firstMonth, indSums);
        sumOfIndicators(monthlyIndicators, indSums);
        sumOfIndicators(endMonth, indSums);
        return toStaticIndicator(shopId, indSums);
    }


    private StaticIndicatorDTO toStaticIndicator(Long shopId, IndSums indSums) {
        StaticIndicatorDTO staticIndicatorDTO = new StaticIndicatorDTO();
        staticIndicatorDTO.setPrice(indSums.sumPrice);
        staticIndicatorDTO.setValue(indSums.sumItems);
        staticIndicatorDTO.setTotal(shopId == null);
        String shopName = getShopName(shopId);
        staticIndicatorDTO.setShopName(shopName);
        return staticIndicatorDTO;
    }

    private void sumOfIndicators(List<? extends CommonIndicator> indicators, IndSums indSums) {
        for (CommonIndicator indicator : indicators) {
            BigDecimal price = indicator.getProductIndicator().getPrice();
            Long value = indicator.getProductIndicator().getValue();
            indSums.addCount(value);
            indSums.addPrice(price);
        }
    }

    private String getShopName(Long shopId) {
        if (shopId == null) {
            return null;
        }
        return shopRepository.findById(shopId).orElseThrow().getName();
    }

    private List<MonthlyIndicator> getMonthlyIndicators(LocalDate firstInclusive, LocalDate lastInclusive, Long shopId, String type) {
        LocalDate start = firstDayOfMonth(firstInclusive);
        LocalDate end = lastDayOfMonth(lastInclusive);
        List<MonthlyIndicator> mis;
        if (shopId == null) {
            mis = monthlyIndicatorRepository.findBetweenGlobalAndType(start, end, type);
        } else {
            mis = monthlyIndicatorRepository.findBetweenShopAndType(start, end, type, shopId);
        }
        return mis;
    }


    private boolean shouldUseDailyIndicatorsForReport(LocalDate start, LocalDate end) {
        return ChronoUnit.DAYS.between(start, end) < 60;
    }

    private List<DateIndicatorDTO> toResponseList(List<? extends CommonIndicator> dailyIndicators) {
        return dailyIndicators.stream().map(this::toResponse).toList();
    }

    private DateIndicatorDTO toResponse(CommonIndicator di) {
        DateIndicatorDTO dto = new DateIndicatorDTO();
        LocalDate date = di.getDate();
        dto.setDate(date);
        ProductIndicator pi = di.getProductIndicator();
        dto.setPrice(pi.getPrice());
        dto.setTotal(pi.getIsTotal());
        dto.setValue(pi.getValue());
        dto.setPrice(pi.getPrice());
        if (pi.getShop() != null) {
            dto.setShopId(pi.getShop().getId());
        }
        return dto;
    }

    @Transactional
    protected void createAllForDate(LocalDate localDate) {
        for (IndType type : Indications.all()) {
            switch (type) {
                case IndType.LOSS -> createLoss(localDate);
                case IndType.REVENUE -> createRevenue(localDate);
                case IndType.SALE -> createSale(localDate);
                case IndType.SUPPLY -> createSupply(localDate);
            }
        }
    }

    @Transactional
    protected void createAllForMonth(LocalDate localDate) {
        for (IndType type : Indications.all()) {
            switch (type) {
                case IndType.LOSS -> creteMonthlyLoss(localDate);
                case IndType.REVENUE -> createMonthlyRevenue(localDate);
                case IndType.SALE -> createMonthlySale(localDate);
                case IndType.SUPPLY -> createMonthlySupply(localDate);
            }
        }
    }
    private static LocalDate firstDayOfMonth(LocalDate localDate) {
        return localDate.withDayOfMonth(1);
    }
    private static LocalDate firstDayOfNextMonth(LocalDate localDate) {
        return localDate.plusMonths(1).withDayOfMonth(1);
    }
    private static LocalDate lastDayOfMonth(LocalDate localDate) {
        return firstDayOfNextMonth(localDate).minusDays(1);
    }

    private static LocalDate lastDayOfPreviousMonth(LocalDate localDate) {
        return lastDayOfMonth(localDate.minusMonths(1));
    }
    @Transactional
    protected void createMonthlySupply(LocalDate localDate) {
        DatesCombined d = withDates(localDate);
        List<Supply> supplies = supplyRepository.findAllByDateRange(d.start, d.end);
        IndSums indSums = calculateSupplies(supplies);
        toMonthlyIndicator(d.firstDay, indSums, "supply");
    }

    @Transactional
    protected void createMonthlySupplyShop(Shop shop, LocalDate localDate) {
        DatesCombined d = withDates(localDate);
        List<Supply> supplies = supplyRepository.findAllByDateRangeAndShop(d.start(), d.end(), shop.getId());
        IndSums indSums = calculateSupplies(supplies);
        toMonthlyIndicatorShop(shop, d.firstDay(), indSums, "supply");
    }

    private static DatesCombined withDates(LocalDate localDate) {
        LocalDate firstDay = firstDayOfMonth(localDate);
        LocalDate lastDay = firstDayOfNextMonth(localDate);
        LocalDateTime start = firstDay.atStartOfDay();
        LocalDateTime end = lastDay.atStartOfDay();
        return new DatesCombined(firstDay, start, end);
    }

    private record DatesCombined(LocalDate firstDay, LocalDateTime start, LocalDateTime end) {
    }


    @Transactional
    protected void createMonthlySale(LocalDate localDate) {
        DatesCombined d = withDates(localDate);
        List<Sale> sales = saleRepository.findAllByDateRange(d.start, d.end);
        IndSums indSums = calculateSale(sales);
        toMonthlyIndicator(d.firstDay, indSums, "sale");
    }

    @Transactional
    protected void createMonthlySaleShop(Shop  shop, LocalDate localDate) {
        DatesCombined d = withDates(localDate);
        List<Sale> sales = saleRepository.findAllByDateRangeAndShop(d.start, d.end, shop.getId());
        IndSums indSums = calculateSale(sales);
        toMonthlyIndicatorShop(shop, d.firstDay, indSums, "sale");
    }

    private IndSums calculateSale(List<Sale> sales) {
        IndSums indSums = new IndSums();
        for (Sale s : sales) {
            addToSums(s.getTransaction(), indSums);
        }
        return indSums;
    }

    @Transactional
    protected void createMonthlyRevenue(LocalDate localDate) {
        DatesCombined d = withDates(localDate);
        List<Supply> supplies = supplyRepository.findAllByDateRange(d.start, d.start);
        List<Sale> sales = saleRepository.findAllByDateRange(d.start, d.end);
        IndSums indSums = calculateRevenue(sales, supplies);
        toMonthlyIndicator(d.firstDay, indSums, "revenue");
    }
    @Transactional
    protected void creteMonthlyLoss(LocalDate localDate) {
        DatesCombined d = withDates(localDate);
        List<Loss> loss = lossRepository.findAllByDateRange(d.start, d.end);
        IndSums indSums = calculateLoss(loss);
        toMonthlyIndicator(d.firstDay, indSums, "loss");
    }

    @Transactional
    protected void createMonthlyRevenueShop(Shop shop, LocalDate localDate) {
        DatesCombined d = withDates(localDate);
        List<Supply> supplies = supplyRepository.findAllByDateRangeAndShop(d.start, d.start, shop.getId());
        List<Sale> sales = saleRepository.findAllByDateRangeAndShop(d.start, d.end, shop.getId());
        IndSums indSums = calculateRevenue(sales, supplies);
        toMonthlyIndicator(d.firstDay, indSums, "revenue");
    }
    @Transactional
    protected void creteMonthlyLossShop(Shop shop, LocalDate localDate) {
        DatesCombined d = withDates(localDate);
        List<Loss> loss = lossRepository.findAllByDateRangeAndShop(d.start, d.end, shop.getId());
        IndSums indSums = calculateLoss(loss);
        toMonthlyIndicator(d.firstDay, indSums, "loss");
    }

    public static class IndSums {
        Long sumItems;
        BigDecimal sumPrice;

        public IndSums() {
            sumItems = 0L;
            sumPrice = BigDecimal.ZERO;
        }
        public void addCount(long size) {
            sumItems += size;
        }
        public void addPrice(BigDecimal delta) {
            sumPrice = sumPrice.add(delta);
        }
        public void subtractPrice(BigDecimal price) {
            sumPrice = sumPrice.subtract(price);
        }
    }

    @Transactional
    protected void createSupplyShop(Shop shop, LocalDate date) {
        LocalDateTime begin = date.atStartOfDay();
        LocalDateTime end = date.plusDays(1L).atStartOfDay();
        List<Supply> allSupplies = supplyRepository.findAllByDateRangeAndShop(begin, end, shop.getId());
        IndSums indSums = calculateSupplies(allSupplies);
        toDailyIndicatorShop(shop, indSums, date, "supply");
    }



    @Transactional
    protected void createSaleShop(Shop shop, LocalDate date) {
        LocalDateTime begin = date.atStartOfDay();
        LocalDateTime end = date.plusDays(1L).atStartOfDay();
        List<Sale> sales = saleRepository.findAllByDateRangeAndShop(begin, end, shop.getId());
        IndSums indSums = calculateSale(sales);
        toDailyIndicatorShop(shop, indSums, date, "sale");
    }

    @Transactional
    protected void createRevenueShop(Shop shop, LocalDate date) {
        LocalDateTime begin = date.atStartOfDay();
        LocalDateTime end = date.plusDays(1L).atStartOfDay();
        List<Supply> supplies = supplyRepository.findAllByDateRangeAndShop(begin, end, shop.getId());
        List<Sale> sales = saleRepository.findAllByDateRangeAndShop(begin, end, shop.getId());
        IndSums indSums = calculateRevenue(sales, supplies);
        toDailyIndicatorShop(shop, indSums, date, "revenue");
    }
    @Transactional
    protected void createLossShop(Shop shop, LocalDate date) {
        LocalDateTime begin = date.atStartOfDay();
        LocalDateTime end = date.plusDays(1L).atStartOfDay();
        List<Loss> loses = lossRepository.findAllByDateRangeAndShop(begin, end, shop.getId());
        IndSums indSums = calculateLoss(loses);
        toDailyIndicatorShop(shop, indSums, date, "loss");
    }


    @Transactional
    protected void createSupply(LocalDate date) {
        LocalDateTime begin = date.atStartOfDay();
        LocalDateTime end = date.plusDays(1L).atStartOfDay();
        addSupplyForDateRange(date, begin, end);
    }

    @Transactional
    protected void createSale(LocalDate date) {
        LocalDateTime begin = date.atStartOfDay();
        LocalDateTime end = date.plusDays(1L).atStartOfDay();
        createSalesForDateRange(date, begin, end);
    }

    @Transactional
    protected void createRevenue(LocalDate date) {
        LocalDateTime begin = date.atStartOfDay();
        LocalDateTime end = date.plusDays(1L).atStartOfDay();
        List<Supply> supplies = supplyRepository.findAllByDateRange(begin, end);
        List<Sale> sales = saleRepository.findAllByDateRange(begin, end);
        IndSums indSums = calculateRevenue(sales, supplies);
        toDailyIndicator(indSums, date, "revenue");
    }
    @Transactional
    protected void createLoss(LocalDate date) {
        LocalDateTime begin = date.atStartOfDay();
        LocalDateTime end = date.plusDays(1L).atStartOfDay();
        List<Loss> loses = lossRepository.findAllByDateRange(begin, end);
        IndSums indSums = calculateLoss(loses);
        toDailyIndicator(indSums, date, "loss");
    }
    @Transactional
    protected void createSalesForDateRange(LocalDate date, LocalDateTime begin, LocalDateTime end) {
        List<Sale> sales = saleRepository.findAllByDateRange(begin, end);
        IndSums indSums = calculateSale(sales);
        toDailyIndicator(indSums, date, "sale");
    }

    private IndSums calculateRevenue(List<Sale> sales, List<Supply> supplies) {
        IndSums indSums = calculateSale(sales);
        for (Supply s : supplies) {
            subtractFromSums(s.getTransaction(), indSums);
        }
        return indSums;
    }

    private IndSums calculateSupplies(List<Supply> allSupplies) {
        IndSums indSums = new IndSums();
        for (Supply s : allSupplies) {
            addToSums(s.getTransaction(), indSums);
        }
        return indSums;
    }

    private IndSums calculateLoss(List<Loss> loses) {
        IndSums indSums = new IndSums();
        for (Loss s : loses) {
            addToSums(s.getTransaction(), indSums);
        }
        return indSums;
    }

    @Transactional
    protected void addSupplyForDateRange(LocalDate date, LocalDateTime begin, LocalDateTime end) {
        List<Supply> allSupplies = supplyRepository.findAllByDateRange(begin, end);
        IndSums indSums = calculateSupplies(allSupplies);
        toDailyIndicator(indSums, date, "supply");
    }

    private ProductIndicator productIndicatorForTotalItems(IndSums indSums) {
        ProductIndicator productIndicator = new ProductIndicator();
        productIndicator.setShop(null);
        productIndicator.setIsTotal(true);
        productIndicator.setValue(indSums.sumItems);
        productIndicator.setPrice(indSums.sumPrice);
        return productIndicator;
    }
    private ProductIndicator productIndicatorForShop(Shop shop, IndSums indSums) {
        ProductIndicator productIndicator = new ProductIndicator();
        productIndicator.setShop(shop);
        productIndicator.setIsTotal(false);
        productIndicator.setValue(indSums.sumItems);
        productIndicator.setPrice(indSums.sumPrice);
        return productIndicator;
    }

    private void addToSums(Transaction transaction, IndSums indSums) {
        List<UsedProduct> products = transaction.getUsedProductList();
        for (UsedProduct product : products) {
            Long lAmount = product.getAmount();
            BigDecimal amount = BigDecimal.valueOf(lAmount);
            indSums.addPrice(product.getPrice().multiply(amount));
            indSums.addCount(lAmount);
        }
    }

    private void subtractFromSums(Transaction transaction, IndSums indSums) {
        List<UsedProduct> products = transaction.getUsedProductList();
        for (UsedProduct product : products) {
            Long amount = product.getAmount();
            BigDecimal bAmount = BigDecimal.valueOf(amount);
            BigDecimal toSubtract = product.getPrice().multiply(bAmount);
            indSums.subtractPrice(toSubtract);
        }
    }

    @Transactional
    protected void toDailyIndicator(IndSums indSums, LocalDate date, String type) {
        DailyIndicator dailyIndicator = new DailyIndicator();
        ProductIndicator productIndicator = productIndicatorForTotalItems(indSums);
        ProductIndicator piSaved = productIndicatorRepository.save(productIndicator);

        dailyIndicator.setDate(date);
        dailyIndicator.setProductIndicator(piSaved);
        dailyIndicator.setType(type);
        dailyIndicatorRepository.save(dailyIndicator);
    }
    @Transactional
    protected void toMonthlyIndicator(LocalDate firstDay, IndSums indSums, String type) {
        MonthlyIndicator monthlyIndicator = new MonthlyIndicator();
        ProductIndicator productIndicator = productIndicatorForTotalItems(indSums);
        ProductIndicator piSaved = productIndicatorRepository.save(productIndicator);

        monthlyIndicator.setDate(firstDay);
        monthlyIndicator.setProductIndicator(piSaved);
        monthlyIndicator.setType(type);
        monthlyIndicatorRepository.save(monthlyIndicator);
    }

    @Transactional
    protected void toDailyIndicatorShop(Shop shop, IndSums indSums, LocalDate date, String type) {
        DailyIndicator dailyIndicator = new DailyIndicator();
        ProductIndicator productIndicator = productIndicatorForShop(shop, indSums);
        ProductIndicator piSaved = productIndicatorRepository.save(productIndicator);

        dailyIndicator.setDate(date);
        dailyIndicator.setProductIndicator(piSaved);
        dailyIndicator.setType(type);
        dailyIndicatorRepository.save(dailyIndicator);
    }
    @Transactional
    protected void toMonthlyIndicatorShop(Shop shop, LocalDate firstDay, IndSums indSums, String type) {
        MonthlyIndicator monthlyIndicator = new MonthlyIndicator();
        ProductIndicator productIndicator = productIndicatorForShop(shop, indSums);
        ProductIndicator piSaved = productIndicatorRepository.save(productIndicator);

        monthlyIndicator.setDate(firstDay);
        monthlyIndicator.setProductIndicator(piSaved);
        monthlyIndicator.setType(type);
        monthlyIndicatorRepository.save(monthlyIndicator);
    }


}
