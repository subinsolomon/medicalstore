package com.example.medicalstore.controller;

import com.example.medicalstore.model.Inventory;
import com.example.medicalstore.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @GetMapping
    public List<Inventory> getAllItems() {
        return inventoryService.getAllItems();
    }

    @PostMapping
    public Inventory createItem(@RequestBody Inventory inventory) {
        return inventoryService.createItem(inventory);
    }
}
