package jerry.asm2.pojos;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer categoryID;

    @NotBlank
    private String categoryName;

    private String categoryDescription;

    @ManyToOne
    @JoinColumn(name = "parentCategoryID")
    private Category parentCategory;

    private Integer isActive; // 1 active, 0 inactive
}