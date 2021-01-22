package com.kutuphaneotomasyonu.kutuphane_otomasyonu.controller;

import java.util.HashMap;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import com.kutuphaneotomasyonu.kutuphane_otomasyonu.exception.ResourceNotFoundException;
import com.kutuphaneotomasyonu.kutuphane_otomasyonu.model.Kullanici;
import com.kutuphaneotomasyonu.kutuphane_otomasyonu.repository.KullaniciRepository;
import com.kutuphaneotomasyonu.kutuphane_otomasyonu.sabitler.Sabitler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/kullanicilar")
@CrossOrigin(origins = "http://localhost:3000")
@ResponseBody
public class KullaniciController {

    @Autowired
    private KullaniciRepository kullaniciRepository;

    //veritabanındaki tüm kullanıcıları almak için
    @GetMapping("")
    public List <Kullanici> tumKitaplariAl() {
        return kullaniciRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    //veritabanına yeni bir kullanıcı eklemek için
    @PostMapping("")
    public Kullanici yeniKullanici(@Valid @RequestBody Kullanici kullanici) {

        kullanici.setRol(Sabitler.rolTipi);
        return kullaniciRepository.save(kullanici);
    }

    @GetMapping("/kullaniciyial/{id}")
    public Optional<Kullanici> birKullaniciyiAl(@PathVariable(value = "id") Long id) {
        return kullaniciRepository.findById(id);
    }

    //id'sine göre bir Kullanici verisini güncellemek için
    @PutMapping("/update/{id}")
    public ResponseEntity < Kullanici > kullaniciyiGuncelle(@PathVariable(value = "id") Long kullaniciId,
                                                   @Valid @RequestBody Kullanici kullaniciNesne) throws ResourceNotFoundException {
        Kullanici kullanici = kullaniciRepository.findById(kullaniciId)
                .orElseThrow(() -> new ResourceNotFoundException("Bu id'de bir kullanıcı bulunamadı: " + kullaniciId));

        kullanici.setAd(kullaniciNesne.getAd());
        kullanici.setSoyad(kullaniciNesne.getSoyad());
        kullanici.setEmail(kullaniciNesne.getEmail());
        kullanici.setRol(kullaniciNesne.getEmail());
        kullanici.setRol(kullaniciNesne.getRol());
        kullanici.setSifre(kullaniciNesne.getSifre());
        kullanici.setKitap_id(kullaniciNesne.getKitap_id());
        final Kullanici updatedKullanici = kullaniciRepository.save(kullanici);
        return ResponseEntity.ok(updatedKullanici);
    }

    //id'sine göre bir kullanıcıyı silmek için
    @DeleteMapping("/delete/{id}")
    public Map < String, Boolean > kullaniciyiSil(@PathVariable(value = "id") Long kullaniciId)
            throws ResourceNotFoundException {
        Kullanici kullanici = kullaniciRepository.findById(kullaniciId)
                .orElseThrow(() -> new ResourceNotFoundException("Silinecek kullanıcı bulunamadı: " + kullaniciId));

        kullaniciRepository.delete(kullanici);
        Map < String, Boolean > response = new HashMap < > ();
        response.put("deleted", Boolean.TRUE);
        return response;
    }



}
