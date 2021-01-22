package com.kutuphaneotomasyonu.kutuphane_otomasyonu.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import com.kutuphaneotomasyonu.kutuphane_otomasyonu.exception.ResourceNotFoundException;
import com.kutuphaneotomasyonu.kutuphane_otomasyonu.model.Kitap;
import com.kutuphaneotomasyonu.kutuphane_otomasyonu.model.Kullanici;
import com.kutuphaneotomasyonu.kutuphane_otomasyonu.repository.KitapRepository;
import com.kutuphaneotomasyonu.kutuphane_otomasyonu.sabitler.Sabitler;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/kitaplar")
@CrossOrigin(origins = "http://localhost:3000")
@ResponseBody
public class KitapController {

    @Autowired
    private KitapRepository kitapRepository;

    //veritabanındaki tüm kitapları almak için
    @GetMapping("")
    public List <Kitap> tumKitaplariAl() {
        return kitapRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    //veritabanına yeni bir kitap eklemek için
    @PostMapping("")
    public Kitap yeniKitap(@Valid @RequestBody Kitap kitap) {

        kitap.setDurumu(Sabitler.kutuphanedekiDurumu);
        return kitapRepository.save(kitap);
    }

    //id'sine göre bir kitabı almak için
   @GetMapping("/{id}")
    public ResponseEntity < Kitap > idyeGoreKitap(@PathVariable(value = "id") Long kitapId)
            throws ResourceNotFoundException {
        Kitap kitap = kitapRepository.findById(kitapId)
                .orElseThrow(() -> new ResourceNotFoundException("Bu id'de bir kitap bulunamadı: " + kitapId));
        return ResponseEntity.ok().body(kitap);
    }

    @GetMapping("/kitabial/{id}")
    public Optional<Kitap> birKitabiyiAl(@PathVariable(value = "id") Long id) {
        return kitapRepository.findById(id);
    }
    
    //id'sine göre bir Kitap verisini güncellemek için
    @PutMapping("/update/{id}")
    public ResponseEntity < Kitap > kitabiGuncelle(@PathVariable(value = "id") Long kitapId,
                                                      @Valid @RequestBody Kitap kitapDetails) throws ResourceNotFoundException {
        Kitap kitap = kitapRepository.findById(kitapId)
                .orElseThrow(() -> new ResourceNotFoundException("Bu id'de bir kitap bulunamadı: " + kitapId));

        kitap.setAd(kitapDetails.getAd());
        kitap.setYazar(kitapDetails.getYazar());
        kitap.setAciklama(kitapDetails.getAciklama());
        kitap.setKategori(kitapDetails.getKategori());
        kitap.setDurumu(kitapDetails.getDurumu());
        final Kitap updatedKitap = kitapRepository.save(kitap);
        return ResponseEntity.ok(updatedKitap);
    }

    //id'sine göre bir veriyi silmek için
    @DeleteMapping("/delete/{id}")
    public Map < String, Boolean > kitabiSil(@PathVariable(value = "id") Long kitapId)
            throws ResourceNotFoundException {
        Kitap kitap = kitapRepository.findById(kitapId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id :: " + kitapId));

        kitapRepository.delete(kitap);
        Map < String, Boolean > response = new HashMap < > ();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

}
