package com.heyoung.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.netty.http.client.HttpClient;

import java.time.Duration;

@Component
public class WebClientConfig {

    private final int MAX_IN_MEMORY_SIZE = 4 * 1024 * 1024;

    @Bean
    public WebClient webClient(@Value("${community.base-url}") String baseUrl) {
        HttpClient http = HttpClient.create()
                .responseTimeout(Duration.ofSeconds(10)) // 서버 응답 타임아웃
                .compress(true);

        return WebClient.builder()
                .baseUrl(baseUrl)
                .clientConnector(new ReactorClientHttpConnector(http))
                .exchangeStrategies(
                        ExchangeStrategies.builder()
                                .codecs(c -> c.defaultCodecs().maxInMemorySize(MAX_IN_MEMORY_SIZE))
                                .build()
                ).build();
    }
}
