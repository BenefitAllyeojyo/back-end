package com.heyoung.domain.outbox.repository;

import com.heyoung.domain.outbox.entity.Outbox;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OutBoxRepository extends JpaRepository<Outbox, Long> {

    // (1) 잠글 대상 id만 가볍게 픽업
    @Query(value = """
        select id
          from outbox
         where sent_at is null
           and (next_retry_at is null or next_retry_at <= now())
           and attempt < :maxAttempt
         order by id
         for update skip locked
         limit :limit
    """, nativeQuery = true)
    List<Long> lockAndPickIds(@Param("limit") int limit, @Param("maxAttempt") int maxAttempt);

    // (2) 리스(lease) 걸기: 지금 집은 것들 n초간 다른 워커가 못 집게 막음
    @Modifying
    @Query(value = """
            update outbox
               set next_retry_at = now() + (:leaseSec || ' seconds')::interval
             where id in (:ids)
    """, nativeQuery = true)
    int leaseByIds(@Param("ids") List<Long> ids, @Param("leaseSec") int leaseSec);
}
