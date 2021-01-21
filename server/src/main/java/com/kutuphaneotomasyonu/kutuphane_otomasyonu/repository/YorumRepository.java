package com.kutuphaneotomasyonu.kutuphane_otomasyonu.repository;

import com.kutuphaneotomasyonu.kutuphane_otomasyonu.model.Yorum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface YorumRepository extends JpaRepository<Yorum, Long>{

}