package com.heyoung.domain.outbox.dto.response;

import java.time.Instant;

public record AccountResponseDto(
        long userId,
        Instant transactionTime
) { }
