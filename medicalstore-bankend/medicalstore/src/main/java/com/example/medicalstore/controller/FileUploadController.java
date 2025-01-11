package com.example.medicalstore.controller;

import com.example.medicalstore.model.Inventory;
import com.example.medicalstore.service.InventoryService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@RestController
public class FileUploadController {

    @Autowired
    private InventoryService inventoryService;

    @PostMapping("/api/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            List<Inventory> inventoryList = parseExcelFile(file.getInputStream());
            inventoryService.saveAll(inventoryList);
            return ResponseEntity.status(HttpStatus.OK).body("File uploaded and data saved successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file!");
        }
    }

    private List<Inventory> parseExcelFile(InputStream inputStream) throws IOException {
        List<Inventory> inventoryList = new ArrayList<>();
        Workbook workbook = new XSSFWorkbook(inputStream);
        Sheet sheet = workbook.getSheetAt(0);
        Iterator<Row> rows = sheet.iterator();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        while (rows.hasNext()) {
            Row row = rows.next();
            if (row.getRowNum() == 0) { // Skip header row
                continue;
            }
            Inventory inventory = new Inventory();
            inventory.setsNo((long) getNumericCellValue(row.getCell(0)));
            inventory.setProductName(getCellValue(row.getCell(1)).toString());
            inventory.setBatchNo(getCellValue(row.getCell(2)).toString());
            inventory.setExpiryDate(LocalDate.parse(getCellValue(row.getCell(3)).toString(), formatter));
            inventory.setRate((Double) getNumericCellValue(row.getCell(4)));
            inventory.setMrp((Double) getNumericCellValue(row.getCell(5)));
            inventory.setQuantity((int) getNumericCellValue(row.getCell(6)));
            inventoryList.add(inventory);
        }
        workbook.close();
        return inventoryList;
    }

    private Object getCellValue(Cell cell) {
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getLocalDateTimeCellValue().toLocalDate();
                } else {
                    return cell.getNumericCellValue();
                }
            case BOOLEAN:
                return cell.getBooleanCellValue();
            case FORMULA:
                switch (cell.getCachedFormulaResultType()) {
                    case STRING:
                        return cell.getRichStringCellValue().getString();
                    case NUMERIC:
                        return cell.getNumericCellValue();
                    default:
                        return "";
                }
            default:
                return "";
        }
    }

    private double getNumericCellValue(Cell cell) {
        return cell.getCellType() == CellType.NUMERIC ? cell.getNumericCellValue() : Double.parseDouble(cell.getStringCellValue());
    }

}
