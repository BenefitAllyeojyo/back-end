package com.heyoung.domain.payment.entity;

import com.heyoung.domain.user.entity.User;
import com.heyoung.global.entity.BaseEntity;
import com.heyoung.global.enums.ApplicationType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.BatchSize;

import java.math.BigDecimal;

@Entity @Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserBenefitHistory extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long partnershipBranchId;

    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal appliedAmount;

    @Enumerated(EnumType.STRING)
    @Column(length = 16, nullable = false)
    private ApplicationType applicationType;

    @Column(columnDefinition = "json", nullable = false)
    private String benefitSnapshotJson; // snapshot of partnership/branch if needed

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User userId; // scalar reference to community user

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transaction_id", nullable = false)
    @BatchSize(size = 50)
    private Transaction transaction;
}
