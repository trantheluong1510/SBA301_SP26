package jerry.asm2.controllers;

import jakarta.validation.Valid;
import jerry.asm2.pojos.SystemAccount;
import jerry.asm2.services.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin("*")
public class AccountController {

    @Autowired
    private IAccountService accountService;

    @GetMapping
    public List<SystemAccount> getAll() {
        return accountService.findAll();
    }

    @PostMapping
    public SystemAccount create(@Valid @RequestBody SystemAccount account) {
        return accountService.create(account);
    }

    @PutMapping("/{id}")
    public SystemAccount update(
            @PathVariable Integer id,
            @RequestBody SystemAccount account) {
        return accountService.update(id, account);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        accountService.delete(id);
    }
    @PatchMapping("/{id}/enabled")
    public SystemAccount setEnabled(
            @PathVariable Integer id,
            @RequestParam boolean value) {
        return accountService.setEnabled(id, value);
    }
}
