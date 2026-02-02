package luongtt.example.lab4.services;

import luongtt.example.lab4.pojos.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface IEmployeeService {

    public Employee getEmployeeById(String id);

    public Employee delete(int id);
    public Employee create(Employee employee);
    public Page<Employee> findAll(Pageable pageable);
}
