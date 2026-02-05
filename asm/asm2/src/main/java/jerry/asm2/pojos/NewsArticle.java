package jerry.asm2.pojos;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "NewsArticle")
public class NewsArticle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer newsArticleID;

    @NotBlank
    private String newsTitle;

    private String headline;

    @Column(columnDefinition = "TEXT")
    private String newsContent;

    private String newsSource;

    private Integer newsStatus; // 1 active, 0 inactive

    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    @ManyToOne
    @JoinColumn(name = "categoryID")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "createdByID")
    private SystemAccount createdBy;

    @ManyToOne
    @JoinColumn(name = "updatedByID")
    private SystemAccount updatedBy;

    @ManyToMany
    @JoinTable(
            name = "NewsTag",
            joinColumns = @JoinColumn(name = "newsArticleID"),
            inverseJoinColumns = @JoinColumn(name = "tagID")
    )
    private Set<Tag> tags;
}