package com.heyoung.domain.outbox.service;

import com.heyoung.domain.outbox.converter.OutBoxConverter;
import com.heyoung.domain.outbox.entity.Outbox;
import com.heyoung.domain.outbox.exception.advice.OutboxControllerAdvice;
import com.heyoung.domain.outbox.repository.OutBoxRepository;
import com.heyoung.domain.payment.dto.response.TransactionListResponse;
import com.heyoung.domain.payment.entity.Account;
import com.heyoung.domain.payment.entity.Transaction;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class OutBoxCommandServiceImpl implements OutBoxCommandService {

    private final OutBoxRepository outBoxRepository;
    private final OutBoxConverter outBoxConverter;

    @Override
    public void saveTransactionOutBox(Transaction transaction) {

        Outbox outbox = outBoxConverter.transactionToOutBox(transaction);
        outBoxRepository.save(outbox);

    }

    @Override
    public void saveAccountOutBox(List<TransactionListResponse> list) {
        List<Outbox> outbox = outBoxConverter.accountToOutBox(list);
        outBoxRepository.saveAll(outbox);
    }
}
