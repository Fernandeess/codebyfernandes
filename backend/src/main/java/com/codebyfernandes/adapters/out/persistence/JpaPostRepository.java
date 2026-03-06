package com.codebyfernandes.adapters.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA Repository for PostEntity.
 */
@Repository
public interface JpaPostRepository extends JpaRepository<PostEntity, Long> {
    List<PostEntity> findByPublished(Boolean published);
}
