package com.heyoung.domain.payment.dto.response;

import lombok.Data;

import java.time.Instant;

@Data
public class TransactionListResponse {
    private long userId;
    private Instant transactionTime;
}
