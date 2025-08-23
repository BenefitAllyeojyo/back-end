package com.heyoung.domain.outbox.entity;

import com.heyoung.domain.outbox.enums.DeliveryErrorType;
import com.heyoung.domain.payment.entity.Transaction;
import com.heyoung.global.entity.BaseEntity;
import com.heyoung.global.enums.OutboxType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Builder
@Table(
        name = "outbox",
        uniqueConstraints = {
                @UniqueConstraint(name = "uq_outbox_uniq_key", columnNames = "uniq_key")
        },
        indexes = {
                @Index(name = "idx_outbox_sendable_hint", columnList = "sent_at, next_retry_at, id"),
                @Index(name = "idx_outbox_created_at", columnList = "created_at")
        }
)
@NoArgsConstructor
@AllArgsConstructor
public class Outbox extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private OutboxType type; // 예: PaymentCompleted

    @Column(nullable = false, columnDefinition = "jsonb")
    private String payload; // 수신측에 보낼 JSON 문자열

    @Column(nullable = false, columnDefinition = "timestamptz")
    private Instant occurredAt;

    @Column(nullable = false, unique = true, length = 160)
    private String uniqKey; // 멱등 키(예: "payment:777" 또는 UUID)

    @Column(nullable = false)
    private Integer attempt = 0;

    @Column(columnDefinition = "timestamptz")
    private Instant nextRetryAt;

    @Column(columnDefinition = "timestamptz")
    private Instant sentAt;

    @Enumerated(EnumType.STRING)
    @Column
    private DeliveryErrorType lastError; // 마지막 전송이 실패한 이유
}
