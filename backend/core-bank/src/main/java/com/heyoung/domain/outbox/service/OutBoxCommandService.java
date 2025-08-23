package com.heyoung.domain.outbox.service;

import com.heyoung.domain.payment.dto.response.TransactionListResponse;
import com.heyoung.domain.payment.entity.Account;
import com.heyoung.domain.payment.entity.Transaction;

import java.util.List;

public interface OutBoxCommandService {
    void saveTransactionOutBox(Transaction transaction);
    void saveAccountOutBox(List<TransactionListResponse> list);
}
