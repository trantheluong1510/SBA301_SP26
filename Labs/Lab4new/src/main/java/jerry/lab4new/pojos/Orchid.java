package jerry.lab4new.pojos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orchid")
public class Orchid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orchid_id")
    private Integer orchidID;

    @NotBlank(message = "Orchid name must not be blank")
    @Size(min = 3, max = 100, message = "Orchid name must be between 3 and 100 characters")
    @Column(name = "orchid_name")
    private String orchidName;

    @Column(name = "is_natural")
    private boolean natural;

    @NotBlank(message = "Description must not be blank")
    @Column(name = "orchid_description")
    private String orchidDescription;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name = "is_attractive")
    private boolean attractive;

    @NotBlank(message = "Image URL must not be blank")
    @Column(name = "orchid_url")
    private String orchidUrl;

    // Backward compatibility for existing service code
    @JsonIgnore
    public Category getOrchidCategory() {
        return this.category;
    }

    @JsonIgnore
    public void setOrchidCategory(Category category) {
        this.category = category;
    }
}
