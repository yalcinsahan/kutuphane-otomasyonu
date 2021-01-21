package com.kutuphaneotomasyonu.kutuphane_otomasyonu.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "yorumlar")
public class Yorum {

    private long id;
    private String kullanici_yorumu;
    private int kitap_id;
    private String kullanici_adi;

    public Yorum() {

    }

    public Yorum(String kullanici_yorumu, int yazar_id, String kullanici_adi) {
        this.kullanici_yorumu = kullanici_yorumu;
        this.kullanici_adi = kullanici_adi;
        this.kitap_id = yazar_id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    @Column(name = "kullanici_yorumu", nullable = false)
    public String getKullanici_yorumu() {
        return kullanici_yorumu;
    }
    public void setKullanici_yorumu(String kullanici_yorumu) {
        this.kullanici_yorumu = kullanici_yorumu;
    }

    @Column(name = "kitap_id", nullable = false)
    public int getKitap_id() {
        return kitap_id;
    }
    public void setKitap_id(int kitap_id) {
        this.kitap_id = kitap_id;
    }

    @Column(name = "kullanici_adi", nullable = false)
    public String getKullanici_adi() {
        return kullanici_adi;
    }
    public void setKullanici_adi(String kullanici_adi) {
        this.kullanici_adi = kullanici_adi;
    }

}