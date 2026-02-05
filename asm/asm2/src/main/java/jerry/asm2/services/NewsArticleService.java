package jerry.asm2.services;

import jerry.asm2.pojos.NewsArticle;
import jerry.asm2.repositories.AccountRepository;
import jerry.asm2.repositories.CategoryRepository;
import jerry.asm2.repositories.NewsArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NewsArticleService implements INewsArticleService {

    @Autowired
    private NewsArticleRepository newsArticleRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public List<NewsArticle> findAll() {
        return newsArticleRepository.findAll();
    }

    @Override
    public List<NewsArticle> findActiveNews() {
        return newsArticleRepository.findByNewsStatus(1);
    }

    @Override
    public NewsArticle create(NewsArticle newsArticle) {
        newsArticle.setCreatedDate(LocalDateTime.now());
        newsArticle.setModifiedDate(LocalDateTime.now());
        newsArticle.setNewsStatus(1);
        return newsArticleRepository.save(newsArticle);
    }

    @Override
    public NewsArticle update(Integer id, NewsArticle newsArticle) {
        NewsArticle exist = newsArticleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("News not found"));

        exist.setNewsTitle(newsArticle.getNewsTitle());
        exist.setHeadline(newsArticle.getHeadline());
        exist.setNewsContent(newsArticle.getNewsContent());
        exist.setNewsSource(newsArticle.getNewsSource());
        exist.setNewsStatus(newsArticle.getNewsStatus());
        exist.setCategory(newsArticle.getCategory());
        exist.setTags(newsArticle.getTags());
        exist.setUpdatedBy(newsArticle.getUpdatedBy());
        exist.setModifiedDate(LocalDateTime.now());

        return newsArticleRepository.save(exist);
    }

    @Override
    public void delete(Integer id) {
        NewsArticle news = newsArticleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("News not found"));
        newsArticleRepository.delete(news);
    }
}
