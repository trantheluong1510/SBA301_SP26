package luongtt.example.lab4.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import luongtt.example.lab4.pojos.Employee;
import luongtt.example.lab4.services.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "Employee Operations", description = "CRUD with your Employee")
public class EmployeeController {

    @Autowired
    private IEmployeeService iEmployeeService;

    @GetMapping(value = "/employees", produces = "application/json")
    public Page<Employee> firstPage(Pageable pageable) {
        return iEmployeeService.findAll(pageable);
    }
    @Operation(
        summary = "Get an employee by ID",
            operationId = "getEmployeeById",
            tags = {"employees"},
            responses = {
                @ApiResponse(responseCode = "200", description = "Employee found", content = @Content(schema = @Schema(implementation = Employee.class))),
                @ApiResponse(responseCode = "404", description = "Employee not found")
            }
    )
    @GetMapping(value = "/employee/{id}")
    public Employee getEmployeeById(@PathVariable String id) {
        return iEmployeeService.getEmployeeById(id);
    }
    @DeleteMapping(path = {"/employees/{id}"})
    public Employee delete(@PathVariable("id") int id) {
        return iEmployeeService.delete(id);
    }

    @PostMapping("/employees")
    public Employee create(@RequestBody Employee employee) {
        return iEmployeeService.create(employee);
    }


}
