package com.codebyfernandes.domain.repositories;

import com.codebyfernandes.domain.entities.User;

import java.util.Optional;

/**
 * User Repository Port.
 * Defines the contract for user persistence operations.
 * This is an Output Port in Hexagonal Architecture.
 */
public interface UserRepository {
    User save(User user);
    Optional<User> findById(Long id);
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    void deleteById(Long id);
    void update(User user);
}
