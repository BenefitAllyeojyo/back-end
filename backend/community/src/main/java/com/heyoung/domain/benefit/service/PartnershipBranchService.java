package com.heyoung.domain.benefit.service;

import com.heyoung.domain.benefit.dto.PartnershipBranchDto;
import com.heyoung.domain.benefit.entity.PartnershipBranch;
import com.heyoung.domain.benefit.repository.PartnershipBranchRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PartnershipBranchService {
    private final PartnershipBranchRepository partnershipBranchRepository;

    public PartnershipBranchService(PartnershipBranchRepository partnershipBranchRepository) {
        this.partnershipBranchRepository = partnershipBranchRepository;
    }

    public List<PartnershipBranchDto> findAllPartnershipBranches(Long partnershipBranchId) {
        List<PartnershipBranch> partnershipBranches = partnershipBranchRepository.findByPartnershipId(partnershipBranchId);
        return partnershipBranches.stream()
                .map(PartnershipBranchDto::new)
                .collect(Collectors.toList());
    }

}
