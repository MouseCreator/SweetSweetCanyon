package mouse.univ.backendapp.mapper;

import mouse.univ.backendapp.dto.loss.LossReasonResponseDTO;
import mouse.univ.backendapp.model.LossReason;
import org.springframework.stereotype.Service;

@Service
public class LossReasonMapperImpl implements LossReasonMapper {
    @Override
    public LossReasonResponseDTO toResponse(LossReason lossReason) {
        LossReasonResponseDTO responseDTO = new LossReasonResponseDTO();
        responseDTO.setId(lossReason.getId());
        responseDTO.setTitle(lossReason.getTitle());
        return responseDTO;
    }
}
