package jerry.lab4new.services;

import jerry.lab4new.pojos.Category;

import java.util.List;
import java.util.Optional;

public interface ICategoryService {
    List<Category> findAll();
    Optional<Category> findById(Integer id);
    Category create(Category category);
    Category update(Integer id, Category category);
    void delete(Integer id);
}
