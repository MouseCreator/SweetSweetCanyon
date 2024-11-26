package mouse.univ.backendapp.auth.fetch.data;

import lombok.Data;

@Data
public class KeyTy {
    private String kty;
    private String n;
    private String e;
    private String kid;
    private String x5t;
    private String x5c;
}
