package com.codebyfernandes.application.services;

import com.codebyfernandes.application.dto.CreatePostRequest;
import com.codebyfernandes.application.dto.PostDTO;
import com.codebyfernandes.application.dto.UpdatePostRequest;
import com.codebyfernandes.application.ports.PostService;
import com.codebyfernandes.domain.entities.Post;
import com.codebyfernandes.domain.exceptions.InvalidUrlException;
import com.codebyfernandes.domain.exceptions.PostNotFoundException;
import com.codebyfernandes.domain.repositories.PostRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Post Service implementation.
 * Contains the business logic for Post operations.
 */
@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public PostDTO createPost(CreatePostRequest request) {
        validateUrl(request.getSourceUrl());

        Post post = Post.builder()
                .title(request.getTitle())
                .category(request.getCategory())
                .content(request.getContent())
                .sourceUrl(request.getSourceUrl())
                .author(request.getAuthor())
                .published(request.getPublished())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        Post savedPost = postRepository.save(post);
        return mapToDTO(savedPost);
    }

    @Override
    public PostDTO updatePost(UpdatePostRequest request) {
        validateUrl(request.getSourceUrl());

        Post existingPost = postRepository.findById(request.getId())
                .orElseThrow(() -> new PostNotFoundException(
                        "Post not found with id: " + request.getId()
                ));

        existingPost.setTitle(request.getTitle());
        existingPost.setCategory(request.getCategory());
        existingPost.setContent(request.getContent());
        existingPost.setSourceUrl(request.getSourceUrl());
        existingPost.setAuthor(request.getAuthor());
        existingPost.setPublished(request.getPublished());
        existingPost.setUpdatedAt(LocalDateTime.now());

        postRepository.update(existingPost);
        return mapToDTO(existingPost);
    }

    @Override
    public PostDTO getPostById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException(
                        "Post not found with id: " + id
                ));
        return mapToDTO(post);
    }

    @Override
    public List<PostDTO> getAllPosts() {
        return postRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<PostDTO> getPublishedPosts() {
        return postRepository.findByPublished(true)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deletePost(Long id) {
        if (!postRepository.findById(id).isPresent()) {
            throw new PostNotFoundException("Post not found with id: " + id);
        }
        postRepository.deleteById(id);
    }

    /**
     * Validates that the URL is in a valid format.
     */
    private void validateUrl(String url) {
        if (!url.matches("^https?://.*")) {
            throw new InvalidUrlException("URL must start with http:// or https://");
        }
    }

    /**
     * Maps Post entity to PostDTO.
     */
    private PostDTO mapToDTO(Post post) {
        return PostDTO.builder()
                .id(post.getId())
                .title(post.getTitle())
                .category(post.getCategory())
                .content(post.getContent())
                .sourceUrl(post.getSourceUrl())
                .author(post.getAuthor())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .published(post.getPublished())
                .build();
    }
}
