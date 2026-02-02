package jerry.lab4new;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan({"jerry.lab4new.controllers", "jerry.lab4new.services"})
@EnableJpaRepositories(basePackages = "jerry.lab4new.repositories")
@EntityScan(basePackages = "jerry.lab4new.pojos")
public class Lab4newApplication {

	public static void main(String[] args) {
		SpringApplication.run(Lab4newApplication.class, args);
	}

}
