package jerry.asm2.repositories;

import jerry.asm2.pojos.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository
        extends JpaRepository<Tag, Integer> {
}
