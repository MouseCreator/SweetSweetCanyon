package mouse.univ.backendapp.service.transaction;

import lombok.AllArgsConstructor;

import mouse.univ.backendapp.dto.page.PageResponseDTO;
import mouse.univ.backendapp.dto.transaction.TransactionRequestDTO;
import mouse.univ.backendapp.dto.transaction.TransactionShortResponseDTO;
import mouse.univ.backendapp.mapper.TransactionMapper;
import mouse.univ.backendapp.model.Loss;
import mouse.univ.backendapp.model.Sale;
import mouse.univ.backendapp.model.Supply;
import mouse.univ.backendapp.model.Transaction;
import mouse.univ.backendapp.repository.LossRepository;
import mouse.univ.backendapp.repository.SaleRepository;
import mouse.univ.backendapp.repository.SupplyRepository;
import mouse.univ.backendapp.repository.TransactionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TransactionSearchService {
    private final TransactionRepository transactionRepository;
    private final LossRepository lossRepository;
    private final SupplyRepository supplyRepository;
    private final SaleRepository saleRepository;
    private final TransactionMapper transactionMapper;

    public PageResponseDTO countPages(TransactionRequestDTO requestDTO) {
        String type = getType(requestDTO);
        Optional<Long> shopId = getShopId(requestDTO);
        Integer itemsPerPage = getItemsPerPage(requestDTO);
        Integer numberItems;
        if (type.equals("all") && shopId.isEmpty()) {
            numberItems = transactionRepository.countAll();
        } else if (type.equals("all")) {
            numberItems = transactionRepository.countAllByShop(shopId.get());
        } else if (shopId.isEmpty()) {
            numberItems = transactionRepository.countAllByType(type);
        } else {
            numberItems = transactionRepository.countAllByShopAndType(shopId.get(), type);
        }
        Integer numberPages = (numberItems + itemsPerPage - 1) / itemsPerPage;
        return new PageResponseDTO(numberPages);
    }
    private Integer getItemsPerPage(TransactionRequestDTO requestDTO) {
        return requestDTO.getItemsPerPage();
    }
    private Optional<Long> getShopId(TransactionRequestDTO requestDTO) {
        return Optional.ofNullable(requestDTO.getShopId());
    }

    private Sort getOrder(TransactionRequestDTO requestDTO) {
        Sort sort;
        String sortType = requestDTO.getSort();
        if (sortType == null || sortType.isEmpty()) {
            return Sort.unsorted();
        }
        switch (sortType) {
            case "recent" -> sort = Sort.by("date").descending();
            case "oldest" -> sort = Sort.by("date").ascending();
            case "price" -> sort = Sort.by("price").descending();
            default -> sort = Sort.by("id").ascending();
        }
        return sort;
    }

    private String getType(TransactionRequestDTO requestDTO) {
        return requestDTO.getType();
    }

    public List<TransactionShortResponseDTO> findTransactions(TransactionRequestDTO requestDTO) {
        String type = getType(requestDTO);
        Integer currentPage = getCurrentPage(requestDTO);
        Optional<Long> shopId = getShopId(requestDTO);
        Integer itemsPerPage = getItemsPerPage(requestDTO);
        Sort sort = getOrder(requestDTO);
        Pageable pageable = PageRequest.of(currentPage, itemsPerPage, sort);
        Page<Transaction> transactions;
        if (type.equals("all") && shopId.isEmpty()) {
            transactions = transactionRepository.findAllByPage(pageable);
        } else if (type.equals("all")) {
            transactions = transactionRepository.findAllByShop(shopId.get(), pageable);
        } else if (shopId.isEmpty()) {
            transactions = transactionRepository.findAllByType(type, pageable);
        } else {
            transactions = transactionRepository.findAllByShopAndType(shopId.get(), type, pageable);
        }
        List<Transaction> content = transactions.getContent();
        return fromContent(content);

    }

    private Integer getCurrentPage(TransactionRequestDTO requestDTO) {
        Integer currentPage = requestDTO.getCurrentPage();
        return currentPage == null ? 0 : currentPage;
    }

    private List<TransactionShortResponseDTO> fromContent(List<Transaction> content) {
        List<TransactionShortResponseDTO> response = new ArrayList<>();
        for (Transaction transaction : content) {
            Long id = transaction.getId();
            Long itemId = null;
            String type = transaction.getType();
            switch (type) {
                case "sale" -> {
                    Sale sale = saleRepository.findByTransaction(id).orElseThrow();
                    itemId = sale.getId();
                }
                case "supply" -> {
                    Supply supply = supplyRepository.findByTransaction(id).orElseThrow();
                    itemId = supply.getId();
                }
                case "loss" -> {
                    Loss loss = lossRepository.findByTransaction(id).orElseThrow();
                    itemId = loss.getId();
                }
            }
            TransactionShortResponseDTO resp = transactionMapper.response(itemId, transaction);
            response.add(resp);
        }
        return response;
    }


}
