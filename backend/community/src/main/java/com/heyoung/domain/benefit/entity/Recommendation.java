package com.heyoung.domain.benefit.entity;

import com.heyoung.global.entity.BaseEntity;
import com.heyoung.global.enums.RecommendationType;
import jakarta.persistence.*;
import org.hibernate.annotations.BatchSize;

import java.math.BigDecimal;

@Entity
public class Recommendation extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(length = 500, nullable = false)
    private String reason;

    @Enumerated(EnumType.STRING)
    @Column(length = 32, nullable = false)
    private RecommendationType type;

    @Column(nullable = false)
    private Boolean clicked;

    @Column(precision = 5, scale = 2, nullable = false)
    private BigDecimal score;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "partnership_id", nullable = false)
    @BatchSize(size = 50)
    private Partnership partnership;
}
