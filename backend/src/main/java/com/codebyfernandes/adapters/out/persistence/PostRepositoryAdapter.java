package com.codebyfernandes.adapters.out.persistence;

import com.codebyfernandes.domain.entities.Post;
import com.codebyfernandes.domain.repositories.PostRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Post Repository Adapter.
 * Implements the PostRepository port using Spring Data JPA.
 * This adapter bridges the Domain Layer and the Persistence Layer.
 */
@Component
public class PostRepositoryAdapter implements PostRepository {

    private final JpaPostRepository jpaPostRepository;

    public PostRepositoryAdapter(JpaPostRepository jpaPostRepository) {
        this.jpaPostRepository = jpaPostRepository;
    }

    @Override
    public Post save(Post post) {
        PostEntity entity = mapToEntity(post);
        PostEntity saved = jpaPostRepository.save(entity);
        return mapToDomain(saved);
    }

    @Override
    public Optional<Post> findById(Long id) {
        return jpaPostRepository.findById(id)
                .map(this::mapToDomain);
    }

    @Override
    public List<Post> findAll() {
        return jpaPostRepository.findAll()
                .stream()
                .map(this::mapToDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<Post> findByPublished(Boolean published) {
        return jpaPostRepository.findByPublished(published)
                .stream()
                .map(this::mapToDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(Long id) {
        jpaPostRepository.deleteById(id);
    }

    @Override
    public void update(Post post) {
        PostEntity entity = mapToEntity(post);
        jpaPostRepository.save(entity);
    }

    /**
     * Maps domain Post to JPA PostEntity.
     */
    private PostEntity mapToEntity(Post post) {
        return PostEntity.builder()
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

    /**
     * Maps JPA PostEntity to domain Post.
     */
    private Post mapToDomain(PostEntity entity) {
        return Post.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .category(entity.getCategory())
                .content(entity.getContent())
                .sourceUrl(entity.getSourceUrl())
                .author(entity.getAuthor())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .published(entity.getPublished())
                .build();
    }
}
