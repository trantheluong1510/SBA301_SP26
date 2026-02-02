package jerry.lab4new.exceptions;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiError {
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
    private List<String> errors;

    public static ApiError of(HttpStatus status, String message, String path, List<String> errors) {
        ApiError api = new ApiError();
        api.setTimestamp(LocalDateTime.now());
        api.setStatus(status.value());
        api.setError(status.getReasonPhrase());
        api.setMessage(message);
        api.setPath(path);
        api.setErrors(errors);
        return api;
    }
}
