package com.kutuphaneotomasyonu.kutuphane_otomasyonu.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "kategoriler")
public class Kategori {

    private long id;
    private String ad;

    public Kategori() {
    }

    public Kategori(String ad) {
        this.ad = ad;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    @Column(name = "ad", nullable = false)
    public String getAd() {
        return ad;
    }
    public void setAd(String firstName) {
        this.ad = firstName;
    }

}
