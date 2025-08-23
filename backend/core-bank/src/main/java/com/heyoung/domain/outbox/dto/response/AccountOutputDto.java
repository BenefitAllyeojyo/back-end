package com.heyoung.domain.outbox.dto.response;

import java.time.Instant;

public record AccountOutputDto(
        long userId,
        Instant transactionTime
) { }
