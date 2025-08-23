package com.heyoung.domain.benefit.controller;

import com.heyoung.domain.benefit.dto.PartnershipDto;
import com.heyoung.domain.benefit.service.PartnershipService;
import com.heyoung.global.webconfig.MemberId;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/partnerships")
public class PartnershipController {

    private final PartnershipService partnershipService;

    public PartnershipController(PartnershipService partnershipService) {
        this.partnershipService = partnershipService;
    }

    @GetMapping("/university")
    public List<PartnershipDto> getPartnerships(@MemberId Long memberId) {
        return partnershipService.findPartnerships(memberId);
    }

}
