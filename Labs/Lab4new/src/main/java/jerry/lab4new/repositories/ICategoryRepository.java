package jerry.lab4new.repositories;

import jerry.lab4new.pojos.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategoryRepository extends JpaRepository<Category, Integer> {
}
