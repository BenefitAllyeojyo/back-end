package com.heyoung.domain.outbox.repository;

import com.heyoung.domain.outbox.entity.Outbox;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OutBoxRepository extends JpaRepository<Outbox, Long> {
}
