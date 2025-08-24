package com.heyoung.domain.recommendation.controller;

import com.heyoung.domain.recommendation.dto.request.SaveUserCategoryRequest;
import com.heyoung.domain.recommendation.dto.request.SaveUserHourHistRequest;
import com.heyoung.domain.recommendation.dto.response.SaveResponse;
import com.heyoung.domain.recommendation.service.RecommendationCommandService;
import com.heyoung.global.exception.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/recommendation")
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationCommandService recommendationCommandService;

    @PostMapping(path = "/category", consumes = "application/json")
    public BaseResponse<SaveResponse> updateUserCategory(@RequestBody List<SaveUserCategoryRequest> saveUserCategoryRequestList) {
        return recommendationCommandService.receiveUserCategory(saveUserCategoryRequestList);
    }

    @PostMapping(path = "/hour", consumes = "application/json")
    public BaseResponse<SaveResponse> updateUserHourHist(@RequestBody List<SaveUserHourHistRequest> saveUserHourHistRequestList) {
        return recommendationCommandService.receiveUserHourHist(saveUserHourHistRequestList);
    }
}
