package jerry.asm2.services;

import jerry.asm2.pojos.NewsArticle;

import java.util.List;

public interface INewsArticleService {
    List<NewsArticle> findAll();
    List<NewsArticle> findActiveNews();
    NewsArticle create(NewsArticle newsArticle);
    NewsArticle update(Integer id, NewsArticle newsArticle);
    void delete(Integer id);
}
