package jerry.asm2.controllers;

import jakarta.validation.Valid;
import jerry.asm2.pojos.NewsArticle;
import jerry.asm2.services.INewsArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news")
@CrossOrigin("*")
public class NewsArticleController {

    @Autowired
    private INewsArticleService newsArticleService;

    @GetMapping
    public List<NewsArticle> getAll() {
        return newsArticleService.findAll();
    }

    @GetMapping("/active")
    public List<NewsArticle> getActive() {
        return newsArticleService.findActiveNews();
    }

    @PostMapping
    public NewsArticle create(@Valid @RequestBody NewsArticle newsArticle) {
        return newsArticleService.create(newsArticle);
    }

    @PutMapping("/{id}")
    public NewsArticle update(
            @PathVariable Integer id,
            @RequestBody NewsArticle newsArticle) {
        return newsArticleService.update(id, newsArticle);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        newsArticleService.delete(id);
    }
}
