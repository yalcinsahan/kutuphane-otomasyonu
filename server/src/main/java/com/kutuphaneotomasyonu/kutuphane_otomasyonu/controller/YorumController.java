package com.kutuphaneotomasyonu.kutuphane_otomasyonu.controller;

import java.util.List;

import javax.validation.Valid;

import com.kutuphaneotomasyonu.kutuphane_otomasyonu.model.Kullanici;
import com.kutuphaneotomasyonu.kutuphane_otomasyonu.model.Yorum;
import com.kutuphaneotomasyonu.kutuphane_otomasyonu.repository.KullaniciRepository;
import com.kutuphaneotomasyonu.kutuphane_otomasyonu.repository.YorumRepository;
import org.hibernate.annotations.Where;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/yorumlar")
@CrossOrigin(origins = "http://localhost:3000")
@ResponseBody
public class YorumController {

    @Autowired
    private YorumRepository yorumRepository;

    //veritabanındaki tüm kullanıcıları eklemek için
    @GetMapping("")
    public List <Yorum> tumYorumlariAl() {
        return yorumRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }


    //veritabanına yeni bir yorum eklemek için
    @PostMapping("")
    public Yorum yeniYorum(@Valid @RequestBody Yorum yorum) {
        return yorumRepository.save(yorum);
    }
    
}
