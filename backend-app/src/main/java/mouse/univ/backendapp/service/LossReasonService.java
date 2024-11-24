package mouse.univ.backendapp.service;

import lombok.AllArgsConstructor;
import mouse.univ.backendapp.dto.loss.LossReasonResponseDTO;
import mouse.univ.backendapp.mapper.LossReasonMapper;
import mouse.univ.backendapp.model.LossReason;
import mouse.univ.backendapp.repository.LossReasonRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class LossReasonService {
    private final LossReasonMapper mapper;
    private final LossReasonRepository repository;
    public List<LossReasonResponseDTO> getAllLossReasons() {
        List<LossReason> all = repository.findAll();
        return all.stream().map(mapper::toResponse).toList();
    }
}
