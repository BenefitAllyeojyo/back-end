package com.heyoung.domain.benefit.controller;

import com.heyoung.domain.benefit.dto.PartnershipDto;
import com.heyoung.domain.benefit.service.PartnershipService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/partnerships")
public class PartnershipController {

    private final PartnershipService partnershipService;

    public PartnershipController(PartnershipService partnershipService) {
        this.partnershipService = partnershipService;
    }

    @GetMapping("/university/{universityId}")
    public List<PartnershipDto> getPartnershipsByUniversityId(@PathVariable Long universityId) {
        return partnershipService.findPartnershipsByUniversityId(universityId);
    }

}
