package luongtt.example.lab4;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"luongtt.example.lab4.controllers", "luongtt.example.lab4.services", "luongtt.example.lab4.repositories", "luongtt.example.lab4.pojos"})
public class Lab4Application {

	public static void main(String[] args) {
		SpringApplication.run(Lab4Application.class, args);
	}

}
