package luongtt.example.lab4.repositories;

import luongtt.example.lab4.pojos.Employee;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface IEmployeeRepository extends PagingAndSortingRepository<Employee, Long> {
    public Employee getEmployeeById(String id);

    public Employee delete(int id);

    public Employee create(Employee employee);

    public List<Employee> getAllEmployees();

}
