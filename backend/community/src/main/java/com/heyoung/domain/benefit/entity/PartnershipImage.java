package com.heyoung.domain.benefit.entity;

import com.heyoung.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.BatchSize;

@Entity @Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PartnershipImage extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 500, nullable = false)
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "partnership_id", nullable = false)
    @BatchSize(size = 50)
    private Partnership partnership;
}
