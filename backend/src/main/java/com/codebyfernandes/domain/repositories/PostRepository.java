package com.codebyfernandes.domain.repositories;

import com.codebyfernandes.domain.entities.Post;

import java.util.List;
import java.util.Optional;

/**
 * Post Repository Port.
 * Defines the contract for post persistence operations.
 * This is an Output Port in Hexagonal Architecture.
 */
public interface PostRepository {
    Post save(Post post);
    Optional<Post> findById(Long id);
    List<Post> findAll();
    List<Post> findByPublished(Boolean published);
    void deleteById(Long id);
    void update(Post post);
}
