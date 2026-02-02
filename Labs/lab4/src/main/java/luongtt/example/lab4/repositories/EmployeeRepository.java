package luongtt.example.lab4.repositories;

import luongtt.example.lab4.pojos.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class EmployeeRepository implements IEmployeeRepository {

    private List<Employee> employees = createEmployees();

    private static List<Employee> createEmployees() {
        return new ArrayList<>(List.of(
                new Employee("1", "John", "Manager", 1000),
                new Employee("2", "Jane", "Developer", 800),
                new Employee("3", "Bob", "Developer", 900)
        ));
    }

    @Override
    public Employee getEmployeeById(String id) {
        Employee employee = null;
        for (Employee e : employees) {
            if (e.getEmpId().equals(id)) {
                employee = e;
                break;
            }
        }
        return employee;
    }

    @Override
    public Employee delete(int id) {
        Employee employee = null;
        for (Employee e : employees) {
            if (e.getEmpId().equals(String.valueOf(id))) {
                employee = e;
                break;
            }
        }
        if (employee != null) {
            employees.remove(employee);
        }
        return employee;
    }

    @Override
    public Employee create(Employee employee) {
        employees.add(employee);
        return employee;
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employees;
    }

    @Override
    public Iterable<Employee> findAll(Sort sort) {
        return employees;
    }

    @Override
    public Page<Employee> findAll(Pageable pageable) {
        int start = (int) pageable.getOffset();
        int size = employees.size();
        if (start >= size) {
            return new PageImpl<>(List.of(), pageable, size);
        }
        int end = Math.min(start + pageable.getPageSize(), size);
        List<Employee> subList = employees.subList(start, end);
        return new PageImpl<>(subList, pageable, size);
    }
}
