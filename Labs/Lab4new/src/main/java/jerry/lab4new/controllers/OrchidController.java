package jerry.lab4new.controllers;

import jakarta.validation.Valid;
import jerry.lab4new.pojos.Orchid;
import jerry.lab4new.services.IOrchidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/orchids")
public class OrchidController {
    @Autowired
    private IOrchidService orchidService;

    @GetMapping("/")
    public ResponseEntity<List<Orchid>> fetchAll() {
        List<Orchid> orchids = orchidService.findAll();
        return ResponseEntity.ok(orchids);
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public Orchid insertOrchid(@Valid @RequestBody Orchid orchid) {
        return orchidService.insertOrchid(orchid);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Orchid>> getOrchidById(@PathVariable int id) {
        Optional<Orchid> orchid = orchidService.getOrchidById(id);
        return ResponseEntity.ok(orchid);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Orchid> updateOrchid(@PathVariable int id, @RequestBody Orchid orchid) {
        Orchid updatedOrchid = orchidService.updateOrchid(id, orchid);
        return ResponseEntity.ok(updatedOrchid);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrchid(@PathVariable int id) {
        orchidService.deleteOrchid(id);
        return ResponseEntity.ok("Orchid deleted successfully");
    }
}
