package jerry.asm2.repositories;

import jerry.asm2.pojos.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository
        extends JpaRepository<Category, Integer> {

    boolean existsByCategoryID(Integer categoryID);
}
