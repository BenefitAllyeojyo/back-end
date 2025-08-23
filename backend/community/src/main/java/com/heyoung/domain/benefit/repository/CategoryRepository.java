package com.heyoung.domain.benefit.repository;

import com.heyoung.domain.benefit.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
