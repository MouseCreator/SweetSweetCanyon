package mouse.univ.backendapp.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import mouse.univ.backendapp.dto.shop.ShopCreateDTO;
import mouse.univ.backendapp.dto.shop.ShopResponseDTO;
import mouse.univ.backendapp.dto.shop.ShopUpdateDTO;
import mouse.univ.backendapp.exception.DataNotFoundException;
import mouse.univ.backendapp.exception.UpdateBadRequestException;
import mouse.univ.backendapp.exception.UpdateNotFoundException;
import mouse.univ.backendapp.mapper.ShopMapper;
import mouse.univ.backendapp.model.Shop;
import mouse.univ.backendapp.repository.ShopRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ShopService {
    private final ShopRepository shopRepository;
    private final ShopMapper shopMapper;
    private final StockService stockService;

    @Transactional
    public ShopResponseDTO createShop(ShopCreateDTO createDTO) {
        Shop shop = shopMapper.fromCreateDTO(createDTO);
        Shop saved = shopRepository.save(shop);
        stockService.initializeShop(saved.getId());
        return shopMapper.toResponseDTO(saved);
    }
    @Transactional
    public ShopResponseDTO updateShop(ShopUpdateDTO updateDTO) {
        Shop shop = shopMapper.fromUpdateDTO(updateDTO);
        Long id = shop.getId();
        if (id == null) {
            throw new UpdateBadRequestException("Cannot update shop, shop has no id");
        }
        boolean exists = shopRepository.existsById(shop.getId());
        if (!exists) {
            throw new UpdateNotFoundException("Cannot update shop. No shop found by id: " + id);
        }
        Shop saved = shopRepository.save(shop);
        return shopMapper.toResponseDTO(saved);
    }

    public List<ShopResponseDTO> getAllShops() {
        List<Shop> all = shopRepository.findAllByOrderByIdAsc();
        return all.stream().map(shopMapper::toResponseDTO).toList();
    }
    public ShopResponseDTO findShopById(Long id) {
        Optional<Shop> byId = shopRepository.findById(id);
        Shop product = byId.orElseThrow(() -> new DataNotFoundException("Cannot find shop by id:" + id));
        return shopMapper.toResponseDTO(product);
    }
    @Transactional
    public void deleteShopById(Long id) {
        stockService.deleteAllByShop(id);
        shopRepository.deleteById(id);
    }

    public boolean existsByName(String name) {
        return shopRepository.existsByName(name);
    }
}
