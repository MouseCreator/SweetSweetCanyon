package mouse.univ.backendapp.mapper;

import mouse.univ.backendapp.dto.loss.LossReasonResponseDTO;
import mouse.univ.backendapp.dto.loss.LossResponseDTO;
import mouse.univ.backendapp.dto.used.UsedProductResponseDTO;
import mouse.univ.backendapp.model.Loss;
import mouse.univ.backendapp.model.Transaction;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LossMapperImpl implements LossMapper {
    private final LossReasonMapper lossReasonMapper;
    private final UsedProductMapper usedProductMapper;

    public LossMapperImpl(LossReasonMapper lossReasonMapper, UsedProductMapper usedProductMapper) {
        this.lossReasonMapper = lossReasonMapper;
        this.usedProductMapper = usedProductMapper;
    }

    @Override
    public LossResponseDTO map(Loss loss) {
        LossResponseDTO lossResponseDTO = new LossResponseDTO();
        Transaction transaction = loss.getTransaction();
        lossResponseDTO.setId(loss.getId());
        lossResponseDTO.setDate(transaction.getDate());
        lossResponseDTO.setCashier(transaction.getUsername());
        lossResponseDTO.setPrice(transaction.getPrice());
        lossResponseDTO.setComment(loss.getComment());

        LossReasonResponseDTO response = lossReasonMapper.toResponse(loss.getReason());

        lossResponseDTO.setReason(response);
        lossResponseDTO.setType("loss");
        List<UsedProductResponseDTO> list = transaction.getUsedProductList()
                .stream()
                .map(usedProductMapper::fromProduct)
                .toList();
        lossResponseDTO.setUsedProducts(list);

        return lossResponseDTO;
    }
}
