package com.heyoung.domain.university.entity;

import com.heyoung.domain.benefit.entity.Partnership;
import com.heyoung.global.entity.BaseEntity;
import com.heyoung.global.enums.UniversityAccess;
import com.heyoung.global.enums.UniversityType;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class University extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 200, nullable = false)
    private String name;

    @Column(length = 50, nullable = false)
    private UniversityType type;

    @Column(length = 100, nullable = false)
    private String campusName;

    @Column(length = 300, nullable = false)
    private String address;

    @Column(length = 100, nullable = false)
    private String cityDistrict;

    @Column(length = 100, nullable = false)
    private String province;

    @Column(length = 20, nullable = false)
    private String postalCode;

    @Column(length = 20, nullable = false)
    private String mainPhone;

    @Column(length = 200, nullable = false)
    private String website;

    @Column(length = 100, nullable = false)
    private String domain;

    @Enumerated(EnumType.STRING)
    @Column(length = 16, nullable = false)
    private UniversityAccess access;

}
