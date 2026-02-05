package jerry.asm2.pojos;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "SystemAccount")
public class SystemAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer accountID;

    @NotBlank
    private String accountName;

    @Email
    @NotBlank
    @Column(unique = true)
    private String accountEmail;

    @NotNull
    private Integer accountRole; // 1 = Admin, 2 = Staff

    @NotBlank
    private String accountPassword;

    @Column(nullable = false)
    private Boolean enabled = true;
}