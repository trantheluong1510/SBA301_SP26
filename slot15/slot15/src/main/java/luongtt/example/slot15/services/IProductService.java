package luongtt.example.slot15.services;

import luongtt.example.slot15.gojos.Product;

import java.util.List;

public interface IProductService {
    List<Product> getAll();
    Product getById(Long id);
    Product create(Product product);
    Product update(Long id, Product product);
    boolean delete(Long id);
}
