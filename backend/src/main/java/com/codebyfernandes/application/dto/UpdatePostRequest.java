package com.codebyfernandes.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

/**
 * Request DTO for updating a post.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdatePostRequest {
    @NotNull(message = "Post ID is required")
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Content is required")
    private String content;

    @NotBlank(message = "Source URL is required")
    @Pattern(regexp = "^https?://.*", message = "Invalid URL format. Must start with http:// or https://")
    private String sourceUrl;

    @NotBlank(message = "Author is required")
    private String author;

    private Boolean published = false;
}
