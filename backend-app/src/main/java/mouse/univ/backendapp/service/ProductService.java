package mouse.univ.backendapp.service;


import lombok.AllArgsConstructor;
import mouse.univ.backendapp.mapper.ProductMapper;
import mouse.univ.backendapp.repository.ProductRepository;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper mapper;

}
