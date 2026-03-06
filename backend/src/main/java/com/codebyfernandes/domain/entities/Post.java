package com.codebyfernandes.domain.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Post entity representing a blog post.
 * This entity is part of the Domain Layer in Hexagonal Architecture.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    private Long id;
    private String title;
    private String category; // "tech", "youtube", "pop-culture"
    private String content;
    private String sourceUrl; // Medium, Dev.to, YouTube URL
    private String author;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean published;
}
