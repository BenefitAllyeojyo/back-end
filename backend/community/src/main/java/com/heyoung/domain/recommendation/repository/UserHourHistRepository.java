package com.heyoung.domain.recommendation.repository;

import com.heyoung.domain.recommendation.entity.UserHourHist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserHourHistRepository extends JpaRepository<UserHourHist, Long> {
}
