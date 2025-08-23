package com.heyoung.domain.recommendation.service;

import com.heyoung.domain.benefit.service.CategoryQueryService;
import com.heyoung.domain.benefit.entity.Category;
import com.heyoung.domain.recommendation.dto.request.SaveUserCategoryRequest;
import com.heyoung.domain.recommendation.dto.request.SaveUserHourHistRequest;
import com.heyoung.domain.recommendation.dto.response.SaveSuccessResponse;
import com.heyoung.domain.recommendation.entity.UserCategory;
import com.heyoung.domain.recommendation.entity.UserHourHist;
import com.heyoung.domain.recommendation.repository.UserCategoryRepository;
import com.heyoung.domain.recommendation.repository.UserHourHistRepository;
import com.heyoung.global.enums.HourBucket;
import com.heyoung.global.exception.BaseResponse;
import com.heyoung.global.exception.ResponseCode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalTime;
import java.time.ZoneId;
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

        // 선호 카테고리 반영
        updateUserCategory(userCategoryRepository.findByUserIdAndCategoryId(saveUserCategoryRequest.userId(), saveUserCategoryRequest.categoryId()), saveUserCategoryRequest.userId(), saveUserCategoryRequest.categoryId());

        // 선호 시간대 반영

        HourBucket hourBucket = HourBucket.of(changeToHour(saveUserCategoryRequest.transactionDateTime()));
        updateUserHourHist(getUserHourHist(saveUserCategoryRequest.userId(), hourBucket), saveUserCategoryRequest.userId(), hourBucket);
        return BaseResponse.onSuccess(new SaveSuccessResponse("카테고리 선호도와 시간대 선호도를 반영했습니다."), ResponseCode.OK);

    }

    @Override
    public BaseResponse<SaveSuccessResponse> receiveUserHourHist(SaveUserHourHistRequest saveUserHourHistRequest) {

        HourBucket hourBucket = HourBucket.of(changeToHour(saveUserHourHistRequest.transactionTime()));
        Optional<UserHourHist> found = getUserHourHist(saveUserHourHistRequest.userId(), hourBucket);

        updateUserHourHist(found, saveUserHourHistRequest.userId(), hourBucket);

        return BaseResponse.onSuccess(new SaveSuccessResponse("시간대 선호도를 반영했습니다."), ResponseCode.OK);

    }

    private Optional<UserHourHist> getUserHourHist(Long userId, HourBucket hourBucket) {
        return userHourHistRepository.findByUserIdAndHourBucket(userId, hourBucket);
    }

    private int changeToHour(Instant instant) {
        // 1) 서울 시간의 시:분:초
        ZoneId seoul = ZoneId.of("Asia/Seoul");
        LocalTime lt = instant.atZone(seoul).toLocalTime();

        return lt.getHour();
    }

    private void updateUserHourHist(Optional<UserHourHist> found, Long userId, HourBucket hourBucket) {
        if (found.isPresent()) {
            found.get().plusUseCount();
        } else {
            UserHourHist userHourHist = UserHourHist.from(userId, hourBucket);
            userHourHistRepository.save(userHourHist);
        }
    }

    private void updateUserCategory(Optional<UserCategory> found, Long userId, Long categoryId) {
        if (found.isPresent()) {
            found.get().plusUseCount();
        } else {
            Category category = categoryQueryService.findById(categoryId);
            UserCategory userCategory = UserCategory.from(userId, category);
            userCategoryRepository.save(userCategory);
        }
    }
}
