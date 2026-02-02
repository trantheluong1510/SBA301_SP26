package jerry.lab4new.services;

import jerry.lab4new.exceptions.ResourceNotFoundException;
import jerry.lab4new.pojos.Category;
import jerry.lab4new.pojos.Orchid;
import jerry.lab4new.repositories.ICategoryRepository;
import jerry.lab4new.repositories.IOrchidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrchidService implements IOrchidService {

    @Autowired
    private ICategoryRepository categoryRepository;

    @Autowired
    private IOrchidRepository iOrchidRepository;

    @Override
    public List<Orchid> findAll() {
        return iOrchidRepository.findAll();
    }

    @Override
    public Orchid insertOrchid(Orchid orchid) {
        Integer categoryId = orchid.getCategory() != null ? orchid.getCategory().getCategoryId() : null;
        if (categoryId == null) {
            throw new IllegalArgumentException("categoryId is required in orchid.category");
        }
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryId));
        orchid.setCategory(category);
        return iOrchidRepository.save(orchid);
    }

    @Override
    public Orchid updateOrchid(int orchidID, Orchid orchid) {
        if (!iOrchidRepository.existsById(orchidID)) {
            throw new ResourceNotFoundException("Orchid not found with id: " + orchidID);
        }
        Integer categoryId = orchid.getCategory() != null ? orchid.getCategory().getCategoryId() : null;
        if (categoryId == null) {
            throw new IllegalArgumentException("categoryId is required in orchid.category");
        }
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryId));
        orchid.setCategory(category);
        orchid.setOrchidID(orchidID);
        return iOrchidRepository.save(orchid);
    }

    @Override
    public void deleteOrchid(int orchidID) {
        if (!iOrchidRepository.existsById(orchidID)) {
            throw new ResourceNotFoundException("Orchid not found with id: " + orchidID);
        }
        iOrchidRepository.deleteById(orchidID);
    }


    @Override
    public Optional<Orchid> getOrchidById(int orchidID) {
        return iOrchidRepository.findById(orchidID);
    }
}