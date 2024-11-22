package mouse.univ.backendapp.controller;

import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.api.ApiResponse;
import mouse.univ.backendapp.service.fill.FillDataBaseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/fill")
public class FillController {

    private final FillDataBaseService fillDataBaseService;
    @GetMapping
    public ResponseEntity<ApiResponse<String>> postProduct() {
        int addItems = fillDataBaseService.addOnRequest();
        String result = addItems > 0 ? "Data base filled successfully. " + addItems + " items added." : "No items added";
        ApiResponse<String> apiResponse = ApiResponse.ok(result);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }
}
