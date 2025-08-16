package com.heyoung.domain.payment.entity;

import com.heyoung.domain.user.entity.User;
import com.heyoung.global.enums.PartnershipCategory;
import com.heyoung.global.enums.TransactionStatus;
import jakarta.persistence.*;
import org.hibernate.annotations.BatchSize;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "`transactions`")
public class Transaction {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long partnershipId;

    @Column(nullable = false)
    private LocalDateTime transactionDateTime;

    @Column(precision = 15, scale = 2, nullable = false)
    private BigDecimal amount;

    @Column(precision = 15, scale = 2, nullable = false)
    private BigDecimal discountAmount;

    @Enumerated(EnumType.STRING)
    @Column(length = 8, nullable = false)
    private TransactionStatus status;

    @Column(length = 100, nullable = false)
    private String merchantName;

    @Enumerated(EnumType.STRING)
    @Column(length = 8, nullable = false)
    private PartnershipCategory category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    @BatchSize(size = 50)
    private Account account;
}
