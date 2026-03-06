package com.codebyfernandes.adapters.out.persistence;

import com.codebyfernandes.domain.entities.User;
import com.codebyfernandes.domain.repositories.UserRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * User Repository Adapter.
 * Implements the UserRepository port using Spring Data JPA.
 * This adapter bridges the Domain Layer and the Persistence Layer.
 */
@Component
public class UserRepositoryAdapter implements UserRepository {

    private final JpaUserRepository jpaUserRepository;

    public UserRepositoryAdapter(JpaUserRepository jpaUserRepository) {
        this.jpaUserRepository = jpaUserRepository;
    }

    @Override
    public User save(User user) {
        UserEntity entity = mapToEntity(user);
        UserEntity saved = jpaUserRepository.save(entity);
        return mapToDomain(saved);
    }

    @Override
    public Optional<User> findById(Long id) {
        return jpaUserRepository.findById(id)
                .map(this::mapToDomain);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return jpaUserRepository.findByUsername(username)
                .map(this::mapToDomain);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return jpaUserRepository.findByEmail(email)
                .map(this::mapToDomain);
    }

    @Override
    public void deleteById(Long id) {
        jpaUserRepository.deleteById(id);
    }

    @Override
    public void update(User user) {
        UserEntity entity = mapToEntity(user);
        jpaUserRepository.save(entity);
    }

    /**
     * Maps domain User to JPA UserEntity.
     */
    private UserEntity mapToEntity(User user) {
        return UserEntity.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .passwordHash(user.getPasswordHash())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .active(user.getActive())
                .build();
    }

    /**
     * Maps JPA UserEntity to domain User.
     */
    private User mapToDomain(UserEntity entity) {
        return User.builder()
                .id(entity.getId())
                .username(entity.getUsername())
                .email(entity.getEmail())
                .passwordHash(entity.getPasswordHash())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .active(entity.getActive())
                .build();
    }
}
