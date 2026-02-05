package jerry.asm2.services;

import jerry.asm2.pojos.Category;

import java.util.List;

public interface ICategoryService {
    List<Category> findAll();
    Category create(Category category);
    Category update(Integer id, Category category);
    void delete(Integer id);
}
