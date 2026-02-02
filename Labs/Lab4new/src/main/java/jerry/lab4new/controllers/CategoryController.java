package jerry.lab4new.controllers;

import jakarta.validation.Valid;
import jerry.lab4new.exceptions.ResourceNotFoundException;
import jerry.lab4new.pojos.Category;
import jerry.lab4new.services.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private ICategoryService categoryService;

    @GetMapping({"", "/"})
    public ResponseEntity<List<Category>> getAll() {
        return ResponseEntity.ok(categoryService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getById(@PathVariable Integer id) {
        Category c = categoryService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        return ResponseEntity.ok(c);
    }

    @PostMapping({"", "/"})
    @ResponseStatus(HttpStatus.CREATED)
    public Category create(@Valid @RequestBody Category category) {
        return categoryService.create(category);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> update(@PathVariable Integer id, @Valid @RequestBody Category category) {
        Category updated = categoryService.update(id, category);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        categoryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
