package jerry.asm2.services;

import jerry.asm2.pojos.Category;
import jerry.asm2.repositories.CategoryRepository;
import jerry.asm2.repositories.NewsArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryService implements ICategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private NewsArticleRepository newsArticleRepository;

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category create(Category category) {
        category.setIsActive(1);
        return categoryRepository.save(category);
    }

    @Override
    public Category update(Integer id, Category category) {
        Category exist = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        exist.setCategoryName(category.getCategoryName());
        exist.setCategoryDescription(category.getCategoryDescription());
        exist.setIsActive(category.getIsActive());
        exist.setParentCategory(category.getParentCategory());

        return categoryRepository.save(exist);
    }

    @Override
    public void delete(Integer id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (newsArticleRepository.existsByCategory(category)) {
            throw new RuntimeException("Cannot delete category that is used");
        }
        categoryRepository.delete(category);
    }
}
