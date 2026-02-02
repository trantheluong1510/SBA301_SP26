package jerry.lab4new.exceptions;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatusCode status,
                                                                  WebRequest request) {
        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(fe -> String.format("%s: %s", fe.getField(), fe.getDefaultMessage()))
                .collect(Collectors.toList());
        ApiError body = ApiError.of(HttpStatus.BAD_REQUEST, "Validation failed", request.getDescription(false), errors);
        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        ApiError body = ApiError.of(HttpStatus.BAD_REQUEST, "Malformed JSON request", request.getDescription(false), List.of(ex.getMostSpecificCause().getMessage()));
        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleMissingServletRequestParameter(MissingServletRequestParameterException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        ApiError body = ApiError.of(HttpStatus.BAD_REQUEST, "Missing parameter", request.getDescription(false), List.of(ex.getParameterName() + " is required"));
        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }


    protected ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        ApiError body = ApiError.of(HttpStatus.NOT_FOUND, "Endpoint not found", request.getDescription(false), List.of(ex.getRequestURL()));
        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

    @Override
    protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        ApiError body = ApiError.of(HttpStatus.METHOD_NOT_ALLOWED, "Method not allowed", request.getDescription(false), List.of(ex.getMethod()));
        return new ResponseEntity<>(body, HttpStatus.METHOD_NOT_ALLOWED);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiError> handleResourceNotFound(ResourceNotFoundException ex, WebRequest request) {
        ApiError body = ApiError.of(HttpStatus.NOT_FOUND, ex.getMessage(), request.getDescription(false), List.of());
        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({MethodArgumentTypeMismatchException.class, IllegalArgumentException.class, IllegalStateException.class})
    public ResponseEntity<ApiError> handleBadRequest(Exception ex, WebRequest request) {
        ApiError body = ApiError.of(HttpStatus.BAD_REQUEST, ex.getMessage(), request.getDescription(false), List.of());
        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EmptyResultDataAccessException.class)
    public ResponseEntity<ApiError> handleEmptyResult(EmptyResultDataAccessException ex, WebRequest request) {
        ApiError body = ApiError.of(HttpStatus.NOT_FOUND, "Resource not found", request.getDescription(false), List.of());
        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleAll(Exception ex, WebRequest request) {
        ApiError body = ApiError.of(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error", request.getDescription(false), List.of(ex.getMessage()));
        return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
