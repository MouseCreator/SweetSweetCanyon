package mouse.univ.backendapp.mapper;

import mouse.univ.backendapp.dto.transaction.TransactionShortResponseDTO;
import mouse.univ.backendapp.model.Transaction;

public interface TransactionMapper {
    TransactionShortResponseDTO response(Long id, Transaction transaction);
}
