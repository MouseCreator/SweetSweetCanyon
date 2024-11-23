package mouse.univ.backendapp.controller;

import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.api.ApiResponse;
import mouse.univ.backendapp.dto.page.PageResponseDTO;
import mouse.univ.backendapp.dto.transaction.TransactionRequestDTO;
import mouse.univ.backendapp.dto.transaction.TransactionShortResponseDTO;
import mouse.univ.backendapp.service.transaction.TransactionSearchService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/transactions")
public class TransactionsController {

    private final TransactionSearchService transactionSearchService;

    @GetMapping("/pages")
    public ResponseEntity<ApiResponse<PageResponseDTO>> getPages(
            @RequestParam("type") String type,
            @RequestParam(value = "shopId", required = false) Long shopId,
            @RequestParam("sort") String sort,
            @RequestParam("itemsPerPage") Integer itemsPerPage,
            @RequestParam("currentPage") Integer currentPage
    ) {
        TransactionRequestDTO requestDTO = new
                TransactionRequestDTO(type, shopId, sort, itemsPerPage, currentPage);
        PageResponseDTO pageResponseDTO = transactionSearchService.countPages(requestDTO);
        ApiResponse<PageResponseDTO> apiResponse = ApiResponse.ok(pageResponseDTO);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<TransactionShortResponseDTO>>> getPageData(
            @RequestParam("type") String type,
            @RequestParam(value = "shopId", required = false) Long shopId,
            @RequestParam("sort") String sort,
            @RequestParam("itemsPerPage") Integer itemsPerPage,
            @RequestParam("currentPage") Integer currentPage
    ) {
        TransactionRequestDTO requestDTO = new
                TransactionRequestDTO(type, shopId, sort, itemsPerPage, currentPage);
        List<TransactionShortResponseDTO> result = transactionSearchService.findTransactions(requestDTO);
        ApiResponse<List<TransactionShortResponseDTO>> apiResponse = ApiResponse.ok(result);
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
