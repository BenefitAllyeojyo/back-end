package com.heyoung.domain.benefit.service;

import com.heyoung.domain.benefit.dto.PartnershipDto;
import com.heyoung.domain.benefit.entity.Partnership;
import com.heyoung.domain.benefit.repository.PartnershipRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class PartnershipService {
    private final PartnershipRepository partnershipRepository;

    public PartnershipService(PartnershipRepository partnershipRepository) {
        this.partnershipRepository = partnershipRepository;
    }

    // 모든 대학의 Partnership
    @Transactional(readOnly = true)
    public List<PartnershipDto> findAllPartnerships() {
        List<Partnership> partnerships = partnershipRepository.findAllWithUniversity();
        return partnerships.stream()
                .map(PartnershipDto::new)
                .collect(Collectors.toList());
    }

    // 특정 대학의 Partnership
    @Transactional(readOnly = true)
    public List<PartnershipDto> findPartnershipsByUniversityId(Long universityId) {
        List<Partnership> partnerships = partnershipRepository.findByUniversityId(universityId);
        return partnerships.stream()
                .map(PartnershipDto::new)
                .collect(Collectors.toList());
    }
}
