package mouse.univ.backendapp.mapper;

import mouse.univ.backendapp.dto.loss.LossReasonResponseDTO;
import mouse.univ.backendapp.model.LossReason;

public interface LossReasonMapper {
    LossReasonResponseDTO toResponse(LossReason lossReason);
}
