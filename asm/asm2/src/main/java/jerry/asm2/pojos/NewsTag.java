package jerry.asm2.pojos;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "NewsTag")
public class NewsTag {
    @Id
    private Integer newsArticleID;
    @Id
    private Integer tagID;
}