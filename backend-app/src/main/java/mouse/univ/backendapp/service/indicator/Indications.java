package mouse.univ.backendapp.service.indicator;

import java.util.List;

public class Indications {
    public static List<String> types() {
        return List.of("loss", "supply", "sale", "revenue");
    }
    public static List<IndType> all() {
        return List.of(IndType.LOSS, IndType.SUPPLY, IndType.SALE, IndType.REVENUE);
    }
}
