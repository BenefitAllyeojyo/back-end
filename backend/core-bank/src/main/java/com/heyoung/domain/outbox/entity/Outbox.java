package com.heyoung.domain.outbox.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(
        name = "outbox",
        uniqueConstraints = {
                @UniqueConstraint(name = "uq_outbox_uniq_key", columnNames = "uniq_key")
        },
        indexes = {
                @Index(name = "idx_outbox_aggregate", columnList = "aggregate_key, id"),
                @Index(name = "idx_outbox_sendable_hint", columnList = "sent_at, next_retry_at, id"),
                @Index(name = "idx_outbox_created_at", columnList = "created_at")
        }
)

public class Outbox {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String type; // 예: PaymentCompleted

    @Column(nullable = false, columnDefinition = "jsonb")
    private String payload; // 수신측에 보낼 JSON 문자열

    @Column(nullable = false, columnDefinition = "timestamptz")
    private Instant occurredAt;

    @Column(length = 80)
    private String aggregateKey; // 예: "user:123"

    @Column(nullable = false, unique = true, length = 160)
    private String uniqKey; // 멱등 키(예: "payment:777" 또는 UUID)

    @Column(nullable = false)
    private Integer attempt = 0;

    @Column(columnDefinition = "timestamptz")
    private Instant nextRetryAt;

    @Column(columnDefinition = "timestamptz")
    private Instant sentAt;

    @Lob
    private String lastError;

    @Column(nullable = false, columnDefinition = "timestamptz")
    private Instant createdAt = Instant.now();

    /* getters/setters, builder 등 생략 */
}
