package mouse.univ.backendapp.service.transaction;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.builder.TransactionBuilder;
import mouse.univ.backendapp.dto.movement.MovementCreateDTO;
import mouse.univ.backendapp.dto.movement.MovementResponseDTO;
import mouse.univ.backendapp.dto.transaction.TransactionItem;
import mouse.univ.backendapp.exception.DataNotFoundException;
import mouse.univ.backendapp.exception.InternalNotFound;
import mouse.univ.backendapp.mapper.MovementMapper;
import mouse.univ.backendapp.model.*;
import mouse.univ.backendapp.repository.*;
import mouse.univ.backendapp.service.StockService;
import mouse.univ.backendapp.service.UsedProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MovementService {
    private final UsedProductService usedProductService;
    private final StockService stockService;
    private final ShopRepository shopRepository;
    private final MovementRepository movementRepository;
    private final TransactionService transactionService;
    private final MovementMapper movementMapper;

    @Transactional
    public MovementResponseDTO moveProduct(Long shopId, String name, MovementCreateDTO createDTO) {
        return doMovement(shopId, name, createDTO);
    }

    public MovementResponseDTO getMovementById(Long id) {
        Movement movement = movementRepository.findByTransaction(id)
                .orElseThrow(() -> new DataNotFoundException("Cannot find movement with id: " + id));
        return movementMapper.toResponse(movement);
    }
    @Transactional
    protected MovementResponseDTO doMovement(Long fromShop, String name, MovementCreateDTO createDTO) {
        List<TransactionItem> items = createDTO.getItems();
        transactionService.validateEnoughItems(fromShop, items);
        List<UsedProduct> usedProducts = usedProductService.loseItems(items);
        Long toShop = createDTO.getToShop();
        Shop shop = shopRepository.findById(fromShop).orElseThrow(() -> new InternalNotFound("shop", fromShop));
        Shop to = shopRepository.findById(fromShop).orElseThrow(() -> new InternalNotFound("shop", toShop));
        TransactionBuilder builder = new TransactionBuilder();

        Transaction transaction = builder.movement()
                .username(name)
                .products(usedProducts)
                .shop(shop)
                .get();
        Transaction savedTransaction = transactionService.saveTransaction(transaction);
        stockService.subtractAllFromStocks(fromShop, items);
        stockService.addAllToStocks(toShop, items);
        Movement movement = new Movement();
        movement.setShop(to);
        movement.setTransaction(savedTransaction);
        Movement saved = movementRepository.save(movement);
        return movementMapper.toResponse(saved);
    }
}
