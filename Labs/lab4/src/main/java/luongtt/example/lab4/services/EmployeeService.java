package luongtt.example.lab4.services;

import luongtt.example.lab4.pojos.Employee;
import luongtt.example.lab4.repositories.IEmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService implements IEmployeeService {

    @Autowired
    private IEmployeeRepository iEmployeeRepository;

    @Override
    public Employee getEmployeeById(String id) {
        return iEmployeeRepository.getEmployeeById(id);
    }

    @Override
    public Employee delete(int id) {
        return iEmployeeRepository.delete(id);
    }

    @Override
    public Employee create(Employee employee) {
        return iEmployeeRepository.create(employee);
    }

    @Override
    public Page<Employee> findAll(Pageable pageable) {
        return iEmployeeRepository.findAll(pageable);
    }
}
