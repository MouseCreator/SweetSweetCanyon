package mouse.univ.backendapp.mapper;

import mouse.univ.backendapp.dto.transaction.TransactionShortResponseDTO;
import mouse.univ.backendapp.model.Transaction;
import org.springframework.stereotype.Service;

@Service
public class TransactionMapperImpl implements TransactionMapper {
    private final ShopMapper shopMapper;

    public TransactionMapperImpl(ShopMapper shopMapper) {
        this.shopMapper = shopMapper;
    }

    @Override
    public TransactionShortResponseDTO response(Long id,Transaction transaction) {
        TransactionShortResponseDTO dto = new TransactionShortResponseDTO();
        dto.setId(id);
        dto.setTransactionId(transaction.getId());
        dto.setType(transaction.getType());
        dto.setDate(transaction.getDate());
        dto.setShop(shopMapper.toResponseDTO(transaction.getShop()));
        dto.setCashier(transaction.getUsername());
        dto.setPrice(transaction.getPrice());
        return dto;
    }
}
