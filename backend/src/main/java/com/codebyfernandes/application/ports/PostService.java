package com.codebyfernandes.application.ports;

import com.codebyfernandes.application.dto.PostDTO;
import com.codebyfernandes.application.dto.CreatePostRequest;
import com.codebyfernandes.application.dto.UpdatePostRequest;

import java.util.List;

/**
 * Input Port for Post use cases.
 * Defines the contract for business logic operations on posts.
 */
public interface PostService {
    PostDTO createPost(CreatePostRequest request);
    PostDTO updatePost(UpdatePostRequest request);
    PostDTO getPostById(Long id);
    List<PostDTO> getAllPosts();
    List<PostDTO> getPublishedPosts();
    void deletePost(Long id);
}
