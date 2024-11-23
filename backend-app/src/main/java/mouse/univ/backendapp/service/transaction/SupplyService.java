package mouse.univ.backendapp.service.transaction;

import lombok.AllArgsConstructor;
import mouse.univ.backendapp.mapper.SupplyMapper;
import mouse.univ.backendapp.service.UsedProductService;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SupplyService {
    private final TransactionService transactionService;
    private final UsedProductService usedProductService;
    private final SupplyMapper supplyMapper;
}
