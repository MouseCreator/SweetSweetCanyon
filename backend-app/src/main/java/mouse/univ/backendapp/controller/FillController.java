package mouse.univ.backendapp.controller;

import lombok.RequiredArgsConstructor;
import mouse.univ.backendapp.api.ApiResponse;
import mouse.univ.backendapp.service.fill.FillDataBaseService;
import mouse.univ.backendapp.service.history.HistoryFillerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/fill")
public class FillController {

    private final FillDataBaseService fillDataBaseService;
    private final HistoryFillerService historyFillerService;
    @GetMapping("/data")
    public ResponseEntity<ApiResponse<String>> postData() {
        int addItems = fillDataBaseService.addOnRequest();
        String result = addItems > 0 ? "Data base filled successfully. " + addItems + " items added." : "No items added";
        ApiResponse<String> apiResponse = ApiResponse.ok(result);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @GetMapping("/history")
    public ResponseEntity<ApiResponse<String>> postHistory() {
        historyFillerService.fillHistory();
        String result = "Populated history";
        ApiResponse<String> apiResponse = ApiResponse.ok(result);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }
}
