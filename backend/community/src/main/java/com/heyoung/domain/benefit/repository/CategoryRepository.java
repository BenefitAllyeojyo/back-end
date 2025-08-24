package com.heyoung.domain.benefit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.heyoung.domain.benefit.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
