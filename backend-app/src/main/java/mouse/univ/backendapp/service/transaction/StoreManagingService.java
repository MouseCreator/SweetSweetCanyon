package mouse.univ.backendapp.service.transaction;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.dto.loss.LossCreateDTO;
import mouse.univ.backendapp.dto.manage.ManageResponseDTO;
import mouse.univ.backendapp.dto.manage.ManageShopDTO;
import mouse.univ.backendapp.dto.manage.ManageShopItem;
import mouse.univ.backendapp.dto.movement.MovementCreateDTO;
import mouse.univ.backendapp.dto.transaction.TransactionItem;
import mouse.univ.backendapp.dto.user.UserDetails;
import mouse.univ.backendapp.exception.ItemBadRequestException;
import mouse.univ.backendapp.service.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StoreManagingService {

    private final LossService lossService;
    private final MovementService movementService;
    private final UserDetailsService userDetailsService;
    @Transactional
    public ManageResponseDTO manage(ManageShopDTO manageShopDTO, UserDetails userDetails) {
        Long shopId = manageShopDTO.getShopId();
        userDetailsService.validateAdminOrCashier(userDetails);
        long count = 0;
        for (ManageShopItem item : manageShopDTO.getItems()) {
            if ("move".equals(item.getType())) {
                onMove(shopId, userDetails, item);
                count++;
            } else if ("loss".equals(item.getType())) {
                onLose(shopId, userDetails, item);
                count++;
            } else {
                throw new ItemBadRequestException("Unknown managing type: " + item.getType());
            }
        }
        return new ManageResponseDTO(count);
    }
    @Transactional
    protected void onMove(Long shopId, UserDetails userDetails, ManageShopItem item) {
        String name = userDetails.getName();
        TransactionItem transactionItem = new TransactionItem();
        transactionItem.setAmount(item.getAmount());
        transactionItem.setProductId(item.getProductId());
        MovementCreateDTO movementCreateDTO = new MovementCreateDTO();
        movementCreateDTO.setItems(List.of(transactionItem));
        movementCreateDTO.setToShop(item.getMoveTo());
        movementService.moveProduct(shopId, name, movementCreateDTO);
    }
    @Transactional
    protected void onLose(Long shopId, UserDetails userDetails, ManageShopItem item) {
        String name = userDetails.getName();
        TransactionItem transactionItem = new TransactionItem();
        transactionItem.setAmount(item.getAmount());
        transactionItem.setProductId(item.getProductId());
        LossCreateDTO lossCreateDTO = new LossCreateDTO();
        lossCreateDTO.setComment(item.getComment());
        lossCreateDTO.setItems(List.of(transactionItem));
        lossCreateDTO.setReasonId(item.getReasonId());
        lossService.loseProduct(shopId, name, lossCreateDTO);
    }
}
