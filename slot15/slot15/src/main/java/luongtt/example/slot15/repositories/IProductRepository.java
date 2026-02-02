package luongtt.example.slot15.repositories;

import luongtt.example.slot15.gojos.Product;

import java.util.List;

public interface IProductRepository {
    List<Product> findAll();
    Product findById(Long id);
    Product save(Product product);
    Product update(Long id, Product product);
    boolean deleteById(Long id);
}
