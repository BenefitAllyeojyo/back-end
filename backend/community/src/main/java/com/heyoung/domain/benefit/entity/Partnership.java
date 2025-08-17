package com.heyoung.domain.benefit.entity;

import com.heyoung.domain.university.entity.University;
import com.heyoung.global.entity.BaseEntity;
import com.heyoung.global.enums.PartnershipCategory;
import com.heyoung.global.enums.PartnershipStatus;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity @Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Partnership extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String companyName;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private PartnershipCategory category;

    @Column(precision = 5, scale = 2, nullable = false)
    private BigDecimal discountRate;

    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal discountAmount;

    @Column(columnDefinition = "text", nullable = false)
    private String terms;

    @Column(columnDefinition = "text")
    private String notes;

    @Enumerated(EnumType.STRING)
    @Column(length = 16, nullable = false)
    private PartnershipStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "university_id", nullable = false)
    private University university;

}
