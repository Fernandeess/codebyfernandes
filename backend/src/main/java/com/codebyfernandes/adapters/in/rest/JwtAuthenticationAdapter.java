package com.codebyfernandes.adapters.in.rest;

import com.codebyfernandes.application.ports.AuthenticationPort;
import com.codebyfernandes.domain.repositories.UserRepository;
import com.codebyfernandes.security.JwtTokenProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Authentication Adapter.
 * Implements the AuthenticationPort using JWT and BCrypt password hashing.
 */
@Component
public class JwtAuthenticationAdapter implements AuthenticationPort {

    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public JwtAuthenticationAdapter(JwtTokenProvider tokenProvider,
                                   UserRepository userRepository,
                                   PasswordEncoder passwordEncoder) {
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public String authenticate(String username, String password) {
        var user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!user.getActive()) {
            throw new RuntimeException("User account is inactive");
        }

        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        return tokenProvider.generateToken(username);
    }
}

