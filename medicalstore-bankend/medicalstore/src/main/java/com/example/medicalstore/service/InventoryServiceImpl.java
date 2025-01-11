package com.example.medicalstore.service;

import com.example.medicalstore.model.Inventory;
import com.example.medicalstore.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryServiceImpl implements InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Override
    public List<Inventory> getAllItems() {
        return inventoryRepository.findAll();
    }

    @Override
    public Inventory createItem(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }
    @Override
    public void saveAll(List<Inventory> inventoryList) {
        inventoryRepository.saveAll(inventoryList);
    }

}
