package com.heyoung.domain.benefit.controller;

import com.heyoung.domain.benefit.dto.PartnershipBranchDto;
import com.heyoung.domain.benefit.service.PartnershipBranchService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/partnerships")
public class PartnershipBranchController {

    private final PartnershipBranchService partnershipBranchService;

    public PartnershipBranchController(PartnershipBranchService partnershipBranchService) {
        this.partnershipBranchService = partnershipBranchService;
    }

    @GetMapping("/{partnershipId}/branches")
    public List<PartnershipBranchDto> getAllPartnershipBranches(@PathVariable Long partnershipId) {
        return partnershipBranchService.findAllPartnershipBranches(partnershipId);
    }

}
