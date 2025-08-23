package com.heyoung.domain.outbox.service;

import com.heyoung.domain.payment.entity.Account;
import com.heyoung.domain.payment.entity.Transaction;

public interface OutBoxCommandService {
    void saveTransactionOutBox(Transaction transaction);
    void saveAccountOutBox(Account account);
}
