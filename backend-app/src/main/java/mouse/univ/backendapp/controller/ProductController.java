package mouse.univ.backendapp.controller;

import lombok.AllArgsConstructor;
import mouse.univ.backendapp.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/products/")
public class ProductController {
    private final ProductService productService;


}
