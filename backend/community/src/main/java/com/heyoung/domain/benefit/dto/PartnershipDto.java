package com.heyoung.domain.benefit.dto;

import com.heyoung.domain.benefit.entity.Partnership;
import lombok.AllArgsConstructor;
import lombok.Getter;
import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public class PartnershipDto {
    private Long id;
    private String companyName;
    private Long categoryId;
    private String categoryCode;
    private BigDecimal discountRate;
    private BigDecimal discountAmount;
    private String terms;
    private String notes;
    private String status;
    private Long universityId;
    private String universityName;

    public PartnershipDto(Partnership p) {
        this.id = p.getId();
        this.companyName = p.getCompanyName();
        this.categoryId = p.getCategory().getId();
        this.categoryCode = p.getCategory().getCode();
        this.discountRate = p.getDiscountRate();
        this.discountAmount = p.getDiscountAmount();
        this.terms = p.getTerms();
        this.notes = p.getNotes();
        this.status = p.getStatus().name();
        this.universityId = p.getUniversity().getId();
        this.universityName = p.getUniversity().getName();
    }

}
