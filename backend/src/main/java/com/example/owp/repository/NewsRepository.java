package com.example.owp.repository;

import com.example.owp.model.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsRepository extends JpaRepository<News,Integer>{
    List<News> findTop3ByOrderByIdDesc();
}
