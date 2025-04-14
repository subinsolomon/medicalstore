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
import java.time.format.DateTimeParseException;
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
        DateTimeFormatter primaryFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter fallbackFormatter = DateTimeFormatter.ofPattern("MM/dd");

        while (rows.hasNext()) {
            Row row = rows.next();
            if (row.getRowNum() == 0) { // Skip header row
                continue;
            }
            Inventory inventory = new Inventory();
            inventory.setProductName(getCellValue(row.getCell(0)).toString());
            inventory.setComp(getCellValue(row.getCell(1)).toString());
            inventory.setQty((int) getNumericCellValue(row.getCell(2)));
            inventory.setFree((int) getNumericCellValue(row.getCell(3)));
            inventory.setBatchNo(getCellValue(row.getCell(4)).toString());
            inventory.setExpiryDate(parseDate(getCellValue(row.getCell(5)).toString(), primaryFormatter, fallbackFormatter));
            inventory.setPack(getCellValue(row.getCell(6)).toString());
            inventory.setPtr(getNumericCellValue(row.getCell(7)));
            inventory.setRate(getNumericCellValue(row.getCell(8)));
            inventory.setDiscPercent(getNumericCellValue(row.getCell(9)));
            inventory.setMrp(getNumericCellValue(row.getCell(10)));
            inventory.setAmount(getNumericCellValue(row.getCell(11)));
            inventory.setI(getCellValue(row.getCell(12)).toString());
            inventory.setC(getCellValue(row.getCell(13)).toString());
            inventory.setS(getCellValue(row.getCell(14)).toString());
            inventory.setGstAmt(getNumericCellValue(row.getCell(15)));
            inventory.setHsnCode(getCellValue(row.getCell(16)).toString());
            inventory.setpRateDisc(getNumericCellValue(row.getCell(17)));
            inventory.setMrpDisc(getNumericCellValue(row.getCell(18)));
            inventory.setExpDate(parseDate(getCellValue(row.getCell(19)).toString(), primaryFormatter, fallbackFormatter));
            inventoryList.add(inventory);
        }
        workbook.close();
        return inventoryList;
    }

    private LocalDate parseDate(String dateStr, DateTimeFormatter primaryFormatter, DateTimeFormatter fallbackFormatter) {
        try {
            return LocalDate.parse(dateStr, primaryFormatter);
        } catch (DateTimeParseException e) {
            try {
                return LocalDate.parse(dateStr, fallbackFormatter);
            } catch (DateTimeParseException ex) {
                // Log the error and handle it appropriately, e.g., set a default date or skip the row
                return null;
            }
        }
    }

    private Object getCellValue(Cell cell) {
        if (cell == null) {
            return "";
        }
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
        if (cell == null) {
            return 0.0;
        }
        return cell.getCellType() == CellType.NUMERIC ? cell.getNumericCellValue() : Double.parseDouble(cell.getStringCellValue());
    }
}
