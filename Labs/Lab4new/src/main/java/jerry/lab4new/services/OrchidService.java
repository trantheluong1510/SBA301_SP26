package jerry.lab4new.services;

import jerry.lab4new.pojos.Orchid;
import jerry.lab4new.repositories.IOrchidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrchidService implements IOrchidService {

    @Autowired
    private IOrchidRepository iOrchidRepository;

    @Override
    public List<Orchid> findAll() {
        return iOrchidRepository.findAll();
    }

    @Override
    public Orchid insertOrchid(Orchid orchid) {
        return iOrchidRepository.save(orchid);
    }

    @Override
    public Orchid updateOrchid(int orchidID, Orchid orchid) {
        Optional<Orchid> optional = iOrchidRepository.findById(orchidID);

        if (optional.isPresent()) {
            Orchid o = optional.get();
            o.setOrchidName(orchid.getOrchidName());
            o.setOrchidDescription(orchid.getOrchidDescription());
            o.setNatural(orchid.isNatural());
            o.setAttractive(orchid.isAttractive());
            o.setOrchidCategory(orchid.getOrchidCategory());
            o.setOrchidUrl(orchid.getOrchidUrl());
            return iOrchidRepository.save(o);
        }
        throw new RuntimeException("Orchid not found");
    }

    @Override
    public void deleteOrchid(int orchidID) {
        iOrchidRepository.deleteById(orchidID);
    }

    @Override
    public Optional<Orchid> getOrchidById(int orchidID) {
        return iOrchidRepository.findById(orchidID);
    }
}