package jerry.lab4new.pojos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "category")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Integer categoryId;

    @NotBlank(message = "Category name must not be blank")
    @Size(min = 3, max = 100, message = "Category name must be between 3 and 100 characters")
    @Column(name = "category_name", unique = true, nullable = false, length = 100)
    private String categoryName;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"category"})
    private List<Orchid> orchids;
}
