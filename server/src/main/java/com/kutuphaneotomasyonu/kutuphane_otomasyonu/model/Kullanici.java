package com.kutuphaneotomasyonu.kutuphane_otomasyonu.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "kullanicilar")
public class Kullanici {

    private long id;
    private String ad;
    private String soyad;
    private String email;
    private String rol;
    private String sifre;
    private String kitap_id;

    public Kullanici() {

    }

    public Kullanici(String ad, String soyad, String email,String rol,String sifre,String kitap_id) {
        this.ad = ad;
        this.soyad = soyad;
        this.email = email;
        this.rol = rol;
        this.sifre = sifre;
        this.kitap_id = kitap_id;
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
    public void setAd(String ad) {
        this.ad = ad;
    }

    @Column(name = "soyad", nullable = false)
    public String getSoyad() {
        return soyad;
    }
    public void setSoyad(String soyad) {
        this.soyad = soyad;
    }

    @Column(name = "email", nullable = false)
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    @Column(name = "sifre", nullable = false)
    public String getSifre() {
        return sifre;
    }
    public void setSifre(String sifre) {
        this.sifre = sifre;
    }

    @Column(name = "rol", nullable = false)
    public String getRol() {
        return rol;
    }
    public void setRol(String rol) {
        this.rol = rol;
    }

    @Column(name = "kitap_id", nullable = true)
    public String getKitap_id() {
        return kitap_id;
    }
    public void setKitap_id(String kitap_id) {
        this.kitap_id = kitap_id;
    }


}
