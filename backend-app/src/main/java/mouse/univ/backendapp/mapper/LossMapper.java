package mouse.univ.backendapp.mapper;

import mouse.univ.backendapp.dto.loss.LossResponseDTO;
import mouse.univ.backendapp.model.Loss;

public interface LossMapper {
    LossResponseDTO map(Loss loss);
}
