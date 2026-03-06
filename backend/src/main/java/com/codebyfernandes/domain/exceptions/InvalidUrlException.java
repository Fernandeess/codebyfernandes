package com.codebyfernandes.domain.exceptions;

/**
 * Exception thrown when an invalid URL is provided.
 */
public class InvalidUrlException extends RuntimeException {
    public InvalidUrlException(String message) {
        super(message);
    }

    public InvalidUrlException(String message, Throwable cause) {
        super(message, cause);
    }
}
