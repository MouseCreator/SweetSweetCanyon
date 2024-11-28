package mouse.univ.backendapp.service.indicator;

import lombok.AllArgsConstructor;
import mouse.univ.backendapp.dto.indicator.DateIndicatorDTO;
import mouse.univ.backendapp.dto.indicator.IndicatorRequestDTO;
import mouse.univ.backendapp.dto.indicator.IndicatorResponseDTO;
import mouse.univ.backendapp.dto.indicator.StaticIndicatorDTO;
import mouse.univ.backendapp.model.Shop;
import mouse.univ.backendapp.repository.ShopRepository;
import mouse.univ.backendapp.utils.DateUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class IndicatorServiceWrapper {
    private IndicatorService indicatorService;
    private ShopRepository shopRepository;
    public IndicatorResponseDTO getReport(IndicatorRequestDTO indicatorRequestDTO) {
        IndicatorResponseDTO responseDTO = new IndicatorResponseDTO();
        LocalDate start = DateUtils.fromString(indicatorRequestDTO.getStartDate());
        LocalDate end = DateUtils.fromString(indicatorRequestDTO.getEndDate());
        String type = indicatorRequestDTO.getType();
        List<DateIndicatorDTO> detailsList;
        detailsList = indicatorService.getAllDaily(start, end, null, type);
        List<Shop> shops = shopRepository.findAll();
        List<StaticIndicatorDTO> staticList = new ArrayList<>();
        StaticIndicatorDTO total = indicatorService.getStaticResponse(start, end, null, type);
        staticList.add(total);
        for (Shop shop : shops) {
            StaticIndicatorDTO indicator = indicatorService.getStaticResponse(start, end, shop.getId(), type);
            staticList.add(indicator);
        }
        responseDTO.setDetailsList(detailsList);
        responseDTO.setStaticList(staticList);
        return responseDTO;
    }

}
