package com.codebyfernandes.application.ports;

/**
 * Input Port for Authentication use cases.
 */
public interface AuthenticationPort {
    String authenticate(String username, String password);
}
