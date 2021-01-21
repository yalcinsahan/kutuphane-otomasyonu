package com.kutuphaneotomasyonu.kutuphane_otomasyonu.controller;

import com.kutuphaneotomasyonu.kutuphane_otomasyonu.exception.ResourceNotFoundException;
import com.kutuphaneotomasyonu.kutuphane_otomasyonu.model.Kategori;
import com.kutuphaneotomasyonu.kutuphane_otomasyonu.model.Kitap;
import com.kutuphaneotomasyonu.kutuphane_otomasyonu.repository.KategoriRepository;
import com.kutuphaneotomasyonu.kutuphane_otomasyonu.repository.KitapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/kategoriler")
@CrossOrigin(origins = "http://localhost:3000")
@ResponseBody
public class KategoriController {

    @Autowired
    private KategoriRepository kategoriRepository;

    //veritabanındaki tüm kategorileri almak için
    @GetMapping("")
    public List <Kategori> tumKatogireleriAl() {
        return kategoriRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    //veritabanına yeni bir kategori eklemek için
    @PostMapping("")
    public Kategori yeniKategori(@Valid @RequestBody Kategori kategori) {
        return kategoriRepository.save(kategori);
    }


}
