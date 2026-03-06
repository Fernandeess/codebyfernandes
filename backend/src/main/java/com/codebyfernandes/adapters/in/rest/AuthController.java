package com.codebyfernandes.adapters.in.rest;

import com.codebyfernandes.application.dto.AuthResponse;
import com.codebyfernandes.application.dto.LoginRequest;
import com.codebyfernandes.application.ports.AuthenticationPort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

/**
 * Authentication REST Controller.
 * Handles login requests and returns JWT tokens.
 * This is an Input Adapter in Hexagonal Architecture.
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final AuthenticationPort authenticationPort;

    public AuthController(AuthenticationPort authenticationPort) {
        this.authenticationPort = authenticationPort;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            String token = authenticationPort.authenticate(request.getUsername(), request.getPassword());
            AuthResponse response = AuthResponse.builder()
                    .token(token)
                    .username(request.getUsername())
                    .message("Login successful")
                    .build();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(AuthResponse.builder()
                    .message("Invalid credentials")
                    .build());
        }
    }
}
