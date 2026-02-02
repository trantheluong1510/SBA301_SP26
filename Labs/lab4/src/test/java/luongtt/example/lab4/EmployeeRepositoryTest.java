package luongtt.example.lab4;

import luongtt.example.lab4.pojos.Employee;
import luongtt.example.lab4.repositories.IEmployeeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;
@DataJpaTest
public class EmployeeRepositoryTest {
    @Autowired
    private IEmployeeRepository employeeRepository;

    @Test
    public void testSaveEmployee() {
        Employee employee = new Employee(
                "TEST01",
                "John",
                "Leader",
                4000
        );

        Employee savedEmployee = employeeRepository.create(employee);

        assertThat(savedEmployee).isNotNull();
        assertThat(savedEmployee.getEmpId()).isNotNull();
        // Add more assertions to verify other properties
    }

}
