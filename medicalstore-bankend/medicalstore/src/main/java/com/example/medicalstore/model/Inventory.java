package com.example.medicalstore.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sNo;
    private String productName;
    private String comp;
    private Integer qty;
    private Integer free;
    private String batchNo;
    private LocalDate expiryDate;
    private String pack;
    private Double ptr;
    private Double rate;
    private Double discPercent;
    private Double mrp;
    private Double amount;
    private String i;
    private String c;
    private String s;
    private Double gstAmt;
    private String hsnCode;
    private Double pRateDisc;
    private Double mrpDisc;
    private LocalDate expDate;

    // Getters and Setters
    public Long getsNo() {
        return sNo;
    }

    public void setsNo(Long sNo) {
        this.sNo = sNo;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getComp() {
        return comp;
    }

    public void setComp(String comp) {
        this.comp = comp;
    }

    public Integer getQty() {
        return qty;
    }

    public void setQty(Integer qty) {
        this.qty = qty;
    }

    public Integer getFree() {
        return free;
    }

    public void setFree(Integer free) {
        this.free = free;
    }

    public String getBatchNo() {
        return batchNo;
    }

    public void setBatchNo(String batchNo) {
        this.batchNo = batchNo;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getPack() {
        return pack;
    }

    public void setPack(String pack) {
        this.pack = pack;
    }

    public Double getPtr() {
        return ptr;
    }

    public void setPtr(Double ptr) {
        this.ptr = ptr;
    }

    public Double getRate() {
        return rate;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }

    public Double getDiscPercent() {
        return discPercent;
    }

    public void setDiscPercent(Double discPercent) {
        this.discPercent = discPercent;
    }

    public Double getMrp() {
        return mrp;
    }

    public void setMrp(Double mrp) {
        this.mrp = mrp;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getI() {
        return i;
    }

    public void setI(String i) {
        this.i = i;
    }

    public String getC() {
        return c;
    }

    public void setC(String c) {
        this.c = c;
    }

    public String getS() {
        return s;
    }

    public void setS(String s) {
        this.s = s;
    }

    public Double getGstAmt() {
        return gstAmt;
    }

    public void setGstAmt(Double gstAmt) {
        this.gstAmt = gstAmt;
    }

    public String getHsnCode() {
        return hsnCode;
    }

    public void setHsnCode(String hsnCode) {
        this.hsnCode = hsnCode;
    }

    public Double getpRateDisc() {
        return pRateDisc;
    }

    public void setpRateDisc(Double pRateDisc) {
        this.pRateDisc = pRateDisc;
    }

    public Double getMrpDisc() {
        return mrpDisc;
    }

    public void setMrpDisc(Double mrpDisc) {
        this.mrpDisc = mrpDisc;
    }

    public LocalDate getExpDate() {
        return expDate;
    }

    public void setExpDate(LocalDate expDate) {
        this.expDate = expDate;
    }
}
