package mouse.univ.backendapp.mapper;

import lombok.AllArgsConstructor;
import mouse.univ.backendapp.dto.movement.MovementResponseDTO;
import mouse.univ.backendapp.dto.used.UsedProductResponseDTO;
import mouse.univ.backendapp.model.Movement;
import mouse.univ.backendapp.model.Shop;
import mouse.univ.backendapp.model.Transaction;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MovementMapperImpl implements MovementMapper {
    private final UsedProductMapper usedProductMapper;
    private final ShopMapper shopMapper;
    @Override
    public MovementResponseDTO toResponse(Movement movement) {
        MovementResponseDTO movementResponseDTO = new MovementResponseDTO();
        Transaction transaction = movement.getTransaction();
        movementResponseDTO.setId(movement.getId());
        movementResponseDTO.setCashier(transaction.getUsername());
        Shop fromShop = transaction.getShop();
        movementResponseDTO.setShop(shopMapper.toResponseDTO(fromShop));
        List<UsedProductResponseDTO> list = transaction.getUsedProductList().stream().map(usedProductMapper::fromProduct).toList();
        movementResponseDTO.setProducts(list);
        movementResponseDTO.setPrice(transaction.getPrice());
        movementResponseDTO.setDate(transaction.getDate());
        movementResponseDTO.setType("move");
        Shop toShop = movement.getShop();
        movementResponseDTO.setToShop(shopMapper.toResponseDTO(toShop));
        return movementResponseDTO;
    }
}
