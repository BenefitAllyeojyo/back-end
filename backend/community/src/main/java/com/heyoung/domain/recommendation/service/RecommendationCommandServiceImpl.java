package com.heyoung.domain.recommendation.service;

import com.heyoung.domain.benefit.service.CategoryQueryService;
import com.heyoung.domain.benefit.entity.Category;
import com.heyoung.domain.recommendation.dto.request.SaveUserCategoryRequest;
import com.heyoung.domain.recommendation.dto.request.SaveUserHourHistRequest;
import com.heyoung.domain.recommendation.dto.response.SaveSuccessResponse;
import com.heyoung.domain.recommendation.entity.UserCategory;
import com.heyoung.domain.recommendation.exception.UserCategoryControllerAdvice;
import com.heyoung.domain.recommendation.repository.UserCategoryRepository;
import com.heyoung.domain.recommendation.repository.UserHourHistRepository;
import com.heyoung.global.exception.BaseResponse;
import com.heyoung.global.exception.ResponseCode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RecommendationCommandServiceImpl implements RecommendationCommandService {

    private final UserCategoryRepository userCategoryRepository;
    private final UserHourHistRepository userHourHistRepository;
    private final CategoryQueryService categoryQueryService;

    @Override
    @Transactional
    public BaseResponse<SaveSuccessResponse> receiveUserCategory(SaveUserCategoryRequest saveUserCategoryRequest) {
        Optional<UserCategory> found =
                userCategoryRepository.findByUserIdAndCategoryId(saveUserCategoryRequest.userId(), saveUserCategoryRequest.categoryId());

        if (found.isPresent()) {
            found.get().plusUseCount();
        } else {
            Category category = categoryQueryService.findById(saveUserCategoryRequest.categoryId());
            UserCategory userCategory = UserCategory.from(saveUserCategoryRequest.userId(), category);
            userCategoryRepository.save(userCategory);
        }
        return BaseResponse.onSuccess(new SaveSuccessResponse("카테고리 선호도를 반영했습니다."), ResponseCode.OK);
    }

    @Override
    public BaseResponse<SaveSuccessResponse> receiveUserHourHist(SaveUserHourHistRequest saveUserHourHistRequest) {
        return null;
    }
}
