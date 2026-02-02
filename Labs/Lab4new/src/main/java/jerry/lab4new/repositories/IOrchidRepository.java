package jerry.lab4new.repositories;

import jerry.lab4new.pojos.Orchid;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrchidRepository extends JpaRepository<Orchid, Integer> {
}
