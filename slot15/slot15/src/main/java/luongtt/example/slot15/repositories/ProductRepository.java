package luongtt.example.slot15.repositories;

import jakarta.annotation.PostConstruct;
import luongtt.example.slot15.gojos.Product;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class ProductRepository implements IProductRepository {
    private final List<Product> storage = new ArrayList<>();
    private final AtomicLong idSeq = new AtomicLong(0);

    @Override
    public List<Product> findAll() {
        return new ArrayList<>(storage);
    }

    @PostConstruct
    public void initData() {
        save(new Product(null, "Laptop Dell", 1500.0, 10));
        save(new Product(null, "iPhone 15", 1200.0, 8));
        save(new Product(null, "Samsung Galaxy S23", 1100.0, 12));
        save(new Product(null, "AirPods Pro", 250.0, 20));
        save(new Product(null, "Logitech Mouse", 45.0, 50));
    }

    @Override
    public Product findById(Long id) {
        for (Product p : storage) {
            if (p.getId().equals(id)) {
                return p;
            }
        }
        return null;
    }


    @Override
    public Product save(Product product) {
        long newId = idSeq.incrementAndGet();
        product.setId(newId);
        storage.add(product);
        return product;
    }

    @Override
    public Product update(Long id, Product product) {
        Product p = findById(id);
        if (p == null) return null;

        if (product.getName() != null) {
            p.setName(product.getName());
        }
        if (product.getPrice() != null) {
            p.setPrice(product.getPrice());
        }
        if (product.getQuantity() != null) {
            p.setQuantity(product.getQuantity());
        }

        return p;
    }

    @Override
    public boolean deleteById(Long id) {
        return storage.removeIf(p -> p.getId().equals(id));
    }
}
