package mouse.univ.backendapp.mapper;

import mouse.univ.backendapp.dto.movement.MovementResponseDTO;
import mouse.univ.backendapp.model.Movement;

public interface MovementMapper {
    MovementResponseDTO toResponse(Movement movement);
}
