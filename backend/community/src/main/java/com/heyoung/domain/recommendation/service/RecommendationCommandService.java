package com.heyoung.domain.recommendation.service;

import com.heyoung.domain.recommendation.dto.request.SaveUserCategoryRequest;
import com.heyoung.domain.recommendation.dto.request.SaveUserHourHistRequest;
import com.heyoung.domain.recommendation.dto.response.SaveSuccessResponse;
import com.heyoung.global.exception.BaseResponse;

public interface RecommendationCommandService {
    BaseResponse<SaveSuccessResponse> receiveUserCategory(SaveUserCategoryRequest saveUserCategoryRequest);
    BaseResponse<SaveSuccessResponse> receiveUserHourHist(SaveUserHourHistRequest saveUserHourHistRequest);
}
