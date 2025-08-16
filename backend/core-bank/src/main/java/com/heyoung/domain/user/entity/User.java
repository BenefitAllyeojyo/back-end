package com.heyoung.domain.user.entity;

import com.heyoung.global.entity.BaseEntity;
import com.heyoung.global.enums.UserStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "`users`")
public class User extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 255)
    private String email;

    @Column(length = 255)
    private String password;

    @Column(length = 100)
    private String name;

    @Column(length = 20)
    private String studentNumber;

    @Column(length = 20)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(length = 8)
    private UserStatus status;

    @Column(nullable = false)
    private Long universityId;
}
