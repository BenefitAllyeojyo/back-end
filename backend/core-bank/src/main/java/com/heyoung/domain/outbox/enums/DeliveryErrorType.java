package com.heyoung.domain.outbox.enums;

public enum DeliveryErrorType {
    NONE, NETWORK, TIMEOUT, HTTP_4XX, HTTP_5XX,
    INVALID_SIGNATURE, INVALID_PAYLOAD, RATE_LIMITED, DESTINATION_UNAVAILABLE, UNKNOWN
}
