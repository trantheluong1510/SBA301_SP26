package jerry.lab4new.services;

import jerry.lab4new.pojos.Category;
import jerry.lab4new.repositories.ICategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService implements ICategoryService {

    @Autowired
    private ICategoryRepository categoryRepository;

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> findById(Integer id) {
        return categoryRepository.findById(id);
    }

    @Override
    public Category create(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category update(Integer id, Category category) {
        return categoryRepository.findById(id)
                .map(c -> {
                    c.setCategoryName(category.getCategoryName());
                    return categoryRepository.save(c);
                })
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    @Override
    public void delete(Integer id) {
        categoryRepository.deleteById(id);
    }
}
