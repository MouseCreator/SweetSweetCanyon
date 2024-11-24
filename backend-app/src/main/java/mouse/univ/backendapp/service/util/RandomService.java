package mouse.univ.backendapp.service.util;

import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class RandomService {
    private final Random random;

    public RandomService() {
        random = new Random();
    }
    public Random rand() {
        return random;
    }
}
