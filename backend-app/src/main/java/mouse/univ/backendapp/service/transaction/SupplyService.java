package mouse.univ.backendapp.service.transaction;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import mouse.univ.backendapp.builder.TransactionBuilder;
import mouse.univ.backendapp.dto.supply.SupplyCreateDTO;
import mouse.univ.backendapp.dto.supply.SupplyResponseDTO;
import mouse.univ.backendapp.dto.transaction.TransactionItem;
import mouse.univ.backendapp.dto.user.UserDetails;
import mouse.univ.backendapp.exception.DataNotFoundException;
import mouse.univ.backendapp.exception.InternalNotFound;
import mouse.univ.backendapp.mapper.SupplyMapper;
import mouse.univ.backendapp.model.*;
import mouse.univ.backendapp.repository.ShopRepository;
import mouse.univ.backendapp.repository.SupplierRepository;
import mouse.univ.backendapp.repository.SupplyRepository;
import mouse.univ.backendapp.service.StockService;
import mouse.univ.backendapp.service.UsedProductService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SupplyService {
    private final SupplyRepository supplyRepository;
    private final UsedProductService usedProductService;
    private final SupplyMapper supplyMapper;
    private final SupplierRepository supplierRepository;
    private final ShopRepository shopRepository;
    private final TransactionService transactionService;
    private final StockService stockService;

    @Transactional
    public SupplyResponseDTO supplyProducts(SupplyCreateDTO supplyCreateDTO, UserDetails userDetails) {
        Long shopId = userDetails.getAssociatedShopId();
        List<TransactionItem> items = supplyCreateDTO.getItems();
        String name = supplyCreateDTO.getSupplierName();
        Long supplierId = supplyCreateDTO.getSupplierId();
        Optional<Supplier> supplierOpt = supplierRepository.findById(supplierId);
        Supplier supplier = supplierOpt.orElseThrow(()->new DataNotFoundException("Cannot find supplier with id " + supplierId));
        List<UsedProduct> usedProducts = usedProductService.supplyItems(items);

        Shop shop = shopRepository.findById(shopId).orElseThrow(() -> new InternalNotFound("shop", shopId));

        TransactionBuilder builder = new TransactionBuilder();
        Transaction transaction = builder.supply()
                .username(userDetails.getName())
                .products(usedProducts)
                .shop(shop)
                .get();
        stockService.addAllToStocks(shopId, items);
        Transaction savedTransaction = transactionService.saveTransaction(transaction);
        Supply supply = new Supply();
        supply.setTransaction(savedTransaction);
        supply.setSupplier(supplier);
        supply.setSupplierName(name);
        Supply saved = save(supply);
        return supplyMapper.toResponse(saved);
    }

    @Transactional
    public Supply save(Supply supply) {
        return supplyRepository.save(supply);
    }

    public SupplyResponseDTO getSupplyById(Long id) {
        Optional<Supply> supplyById = supplyRepository.findById(id);
        Supply supply = supplyById.orElseThrow(() -> new DataNotFoundException("Cannot find supply №" + id));
        return supplyMapper.toResponse(supply);
    }
}
