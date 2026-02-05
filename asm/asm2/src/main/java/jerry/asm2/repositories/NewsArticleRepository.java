package jerry.asm2.repositories;

import jerry.asm2.pojos.Category;
import jerry.asm2.pojos.NewsArticle;
import jerry.asm2.pojos.SystemAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NewsArticleRepository
        extends JpaRepository<NewsArticle, Integer> {

    boolean existsByCategory(Category category);

    boolean existsByCreatedBy(SystemAccount account);

    List<NewsArticle> findByNewsStatus(Integer status);
}
