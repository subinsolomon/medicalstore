package com.example.medicalstore.service;

import com.example.medicalstore.model.Inventory;
import java.util.List;

public interface InventoryService {
    List<Inventory> getAllItems();
    Inventory createItem(Inventory inventory);
    void saveAll(List<Inventory> inventoryList);
}
