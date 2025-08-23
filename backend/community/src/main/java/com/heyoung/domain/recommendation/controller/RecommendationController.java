package com.heyoung.domain.recommendation.controller;

import com.heyoung.domain.recommendation.dto.request.SaveUserCategoryRequest;
import com.heyoung.domain.recommendation.dto.response.SaveSuccessResponse;
import com.heyoung.domain.recommendation.service.RecommendationCommandService;
import com.heyoung.global.exception.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/recommendation")
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationCommandService recommendationCommandService;

    @PostMapping("/category")
    public BaseResponse<SaveSuccessResponse> updateUserCategory(SaveUserCategoryRequest saveUserCategoryRequest) {
        return recommendationCommandService.receiveUserCategory(saveUserCategoryRequest);
    }
}
