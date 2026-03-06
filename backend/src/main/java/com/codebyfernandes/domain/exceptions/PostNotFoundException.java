package com.codebyfernandes.domain.exceptions;

/**
 * Exception thrown when a post is not found.
 */
public class PostNotFoundException extends RuntimeException {
    public PostNotFoundException(String message) {
        super(message);
    }

    public PostNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
