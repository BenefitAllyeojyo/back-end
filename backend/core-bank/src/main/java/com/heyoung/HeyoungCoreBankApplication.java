package com.heyoung;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class HeyoungCoreBankApplication {
	public static void main(String[] args) {
		SpringApplication.run(HeyoungCoreBankApplication.class, args);
	}
}
