package com.codebyfernandes.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Data Transfer Object for Post.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostDTO {
    private Long id;
    private String title;
    private String category;
    private String content;
    private String sourceUrl;
    private String author;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean published;
}
