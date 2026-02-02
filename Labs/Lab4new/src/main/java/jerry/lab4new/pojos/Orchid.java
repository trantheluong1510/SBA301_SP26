package jerry.lab4new.pojos;

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

    @NotBlank(message = "Category must not be blank")
    @Column(name = "orchid_category")
    private String orchidCategory;

    @Column(name = "is_attractive")
    private boolean attractive;

    @NotBlank(message = "Image URL must not be blank")
    @Column(name = "orchid_url")
    private String orchidUrl;
}
