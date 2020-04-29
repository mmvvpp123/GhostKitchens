package com.example.ghostkitchen.model;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    BigDecimal total = new BigDecimal("0.00");

    int numberOfItems;

    public void setNumberOfItems(int numberOfItems) {
        this.numberOfItems = numberOfItems;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "cart_items",
            joinColumns = @JoinColumn(name = "cart_id"),
            inverseJoinColumns = @JoinColumn(name = "cart_item_id"))
    List<CartItem> items = new ArrayList<>();

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public int getNumberOfItems() {
        return this.numberOfItems;
    }

    public void addItem(CartItem item) {
        if (this.items.contains(item)) {
            item.increaseQuantity();
        }
        else {
            this.items.add(item);
        }
        final BigDecimal ITEM_PRICE = item.getPrice();
        final BigDecimal ITEM_QUANTITY = new BigDecimal(item.getQuantity());
        this.numberOfItems++;
        addToTotal(item.getPrice());
        item.setPrice(ITEM_PRICE.multiply(ITEM_QUANTITY));
    }

    public void removeItem(CartItem item) {
        this.items.remove(item);
        this.numberOfItems--;
        this.setTotal(this.total.subtract(item.getPrice()));
    }

    public void emptyCart() {
        this.numberOfItems = 0;
        this.items.clear();
        this.total = new BigDecimal("0.00");
    }

    private void addToTotal(BigDecimal price) {
        this.total = this.total.add(price);
    }
}
