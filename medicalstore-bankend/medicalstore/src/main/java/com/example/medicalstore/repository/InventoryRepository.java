package com.example.medicalstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.medicalstore.model.Inventory;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
}
