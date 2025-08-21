package com.heyoung.domain.recommendation.entity;

import com.heyoung.global.entity.BaseEntity;
import com.heyoung.global.enums.HourBucket;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 유저가 가장 많이 결제한 시간대 카운트.
 */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserHourHist extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private HourBucket hourBucket;

    @Column(nullable = false)
    private int useCount = 0;

}
