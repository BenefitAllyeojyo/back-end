package com.heyoung.domain.notification.entity;

import jakarta.persistence.*;

@Entity
public class FcmKey {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false, length = 255)
    private String fcmToken;
}
