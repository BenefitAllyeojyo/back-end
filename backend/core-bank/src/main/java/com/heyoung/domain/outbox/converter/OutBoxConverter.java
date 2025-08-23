package com.heyoung.domain.outbox.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.heyoung.domain.outbox.dto.response.AccountResponseDto;
import com.heyoung.domain.outbox.dto.response.TransactionResponseDto;
import com.heyoung.domain.outbox.entity.Outbox;
import com.heyoung.domain.outbox.exception.advice.OutboxControllerAdvice;
import com.heyoung.domain.payment.dto.response.TransactionListResponse;
import com.heyoung.domain.payment.entity.Transaction;
import com.heyoung.global.enums.OutboxType;
import com.heyoung.global.exception.ResponseCode;
import com.heyoung.global.utils.UuidUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class OutBoxConverter {

    private final ObjectMapper om; // ← 전역 설정 주입
    private final UuidUtil uuidUtil;

    public Outbox transactionToOutBox(Transaction transaction) {

        String json = null;
        try {
            json = om.writeValueAsString(
                    new TransactionResponseDto(transaction.getUser().getId(), transaction.getCategory().getId(), transaction.getTransactionDateTime())
            );
        } catch (JsonProcessingException e) {
            throw new OutboxControllerAdvice(ResponseCode.JSON_CREATE_FAIL);
        }

        return Outbox.builder()
                .payload(json)// Json - 결제 후 사용자 취향 반영해야 하는 데이터 전송
                .occurredAt(transaction.getTransactionDateTime())
                .uniqKey(uuidUtil.createUuid())
                .type(OutboxType.TRANSACTION_COMPLETED).build();
    }

    public List<Outbox> accountToOutBox(List<TransactionListResponse> list) {
        List<Outbox> res = new ArrayList<>();
        for(TransactionListResponse data : list) {
            String json = null;
            try {
                json = om.writeValueAsString(
                        new AccountResponseDto(data.getUserId(), data.getTransactionTime())
                );
            } catch (JsonProcessingException e) {
                throw new OutboxControllerAdvice(ResponseCode.JSON_CREATE_FAIL);
            }

            res.add(Outbox.builder()
                    .payload(json)// Json - 결제 후 사용자 취향 반영해야 하는 데이터 전송
                    .occurredAt(data.getTransactionTime())
                    .uniqKey(uuidUtil.createUuid())
                    .type(OutboxType.PAYMENT_METHOD_LINKED).build());
        }

        return res;
    }
}
