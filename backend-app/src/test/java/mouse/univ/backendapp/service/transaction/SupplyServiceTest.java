package mouse.univ.backendapp.service.transaction;

import mouse.univ.backendapp.dto.supply.SupplyCreateDTO;
import mouse.univ.backendapp.dto.supply.SupplyResponseDTO;
import mouse.univ.backendapp.dto.transaction.TransactionItem;
import mouse.univ.backendapp.dto.user.UserDetails;
import mouse.univ.backendapp.framework.DatabaseTestFiller;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestExecutionListeners;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@TestExecutionListeners(
        listeners = {DatabaseTestFiller.class}, mergeMode = TestExecutionListeners.MergeMode.MERGE_WITH_DEFAULTS)
class SupplyServiceTest {

    @Autowired
    private SupplyService supplyService;
    @Test
    void saleProducts() {
        SupplyCreateDTO supplyCreateDTO = new SupplyCreateDTO();
        Long sId = 1L;
        String sName = "Jonathan";
        supplyCreateDTO.setSupplierId(sId);
        supplyCreateDTO.setSupplierName(sName);
        TransactionItem transactionItem1 = new TransactionItem(4L, 2L);
        TransactionItem transactionItem2 = new TransactionItem(5L, 5L);
        UserDetails userDetails = UserDetails.asCashier();
        supplyCreateDTO.setItems(List.of(transactionItem1, transactionItem2));
        LocalDateTime before = LocalDateTime.now();
        SupplyResponseDTO response = supplyService.supplyProducts(supplyCreateDTO, userDetails);
        LocalDateTime after = LocalDateTime.now();

        LocalDateTime date = response.getDate();
        assertTrue(before.isBefore(date));
        assertTrue(after.isAfter(date));

        assertEquals("supply", response.getType());
        assertEquals("Cashier", response.getUsername());
        assertEquals(sId, response.getSupplier().getId());
        assertEquals(sName, response.getSupplierName());
        assertEquals(2, response.getProducts().size());
    }

}