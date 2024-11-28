package mouse.univ.backendapp.service;

import mouse.univ.backendapp.dto.suppliers.SuppliersResponseDTO;
import mouse.univ.backendapp.framework.DatabaseTestFiller;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestExecutionListeners;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@TestExecutionListeners(
        listeners = {DatabaseTestFiller.class}, mergeMode = TestExecutionListeners.MergeMode.MERGE_WITH_DEFAULTS)
class SuppliersServiceTest {
    @Autowired
    private SuppliersService suppliersService;
    @Test
    public void testGetSuppliers() {
        List<SuppliersResponseDTO> allSuppliers = suppliersService.getAllSuppliers();
        assertFalse(allSuppliers.isEmpty());
    }
}