package jerry.lab4new.services;

import jerry.lab4new.pojos.Orchid;

import java.util.List;
import java.util.Optional;

public interface  IOrchidService {
    public List<Orchid> findAll();
    public Orchid insertOrchid(Orchid orchid);
    public Orchid updateOrchid(int orchidID, Orchid orchid);
    public void deleteOrchid(int orchidID);
    public Optional<Orchid> getOrchidById(int orchidID);
}
