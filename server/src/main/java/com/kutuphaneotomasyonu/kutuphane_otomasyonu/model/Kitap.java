package com.kutuphaneotomasyonu.kutuphane_otomasyonu.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "kitaplar")
public class Kitap {

    private long id;
    private String ad;
    private String yazar;
    private String kategori;
    private String aciklama;
    private String durumu;

    public Kitap() {

    }

    public Kitap(String ad, String yazar, String kategori,String aciklama,String durumu) {
        this.ad = ad;
        this.yazar = yazar;
        this.kategori = kategori;
        this.aciklama = aciklama;
        this.durumu = durumu;
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

    @Column(name = "yazar", nullable = false)
    public String getYazar() {
        return yazar;
    }
    public void setYazar(String lastName) {
        this.yazar = lastName;
    }

    @Column(name = "kategori", nullable = false)
    public String getKategori() {
        return kategori;
    }
    public void setKategori(String kategori) {
        this.kategori = kategori;
    }

    @Column(name = "aciklama", nullable = false)
    public String getAciklama() {
        return aciklama;
    }
    public void setAciklama(String aciklama) {
        this.aciklama = aciklama;
    }

    @Column(name = "durumu", nullable = true)
    public String getDurumu() {
        return durumu;
    }
    public void setDurumu(String durumu) {
        this.durumu = durumu;
    }

}
