package mouse.univ.backendapp.utils;

import mouse.univ.backendapp.exception.ItemBadRequestException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class DateUtils {
    public static LocalDate fromString(String dateString) {
        return fromString(dateString, "dd.MM.yyyy");
    }
    public static LocalDate fromString(String dateString, String pattern) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
        try {
            return LocalDate.parse(dateString, formatter);
        } catch (DateTimeParseException e) {
            throw new ItemBadRequestException("Invalid date format: " + e.getMessage());
        }
    }
}
