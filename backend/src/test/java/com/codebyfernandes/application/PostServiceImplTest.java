package com.codebyfernandes.application;

import com.codebyfernandes.application.dto.CreatePostRequest;
import com.codebyfernandes.application.dto.PostDTO;
import com.codebyfernandes.application.dto.UpdatePostRequest;
import com.codebyfernandes.application.services.PostServiceImpl;
import com.codebyfernandes.domain.entities.Post;
import com.codebyfernandes.domain.exceptions.InvalidUrlException;
import com.codebyfernandes.domain.exceptions.PostNotFoundException;
import com.codebyfernandes.domain.repositories.PostRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Unit tests for PostServiceImpl.
 */
@DisplayName("PostServiceImpl Tests")
class PostServiceImplTest {

    private PostRepository postRepository;
    private PostServiceImpl postService;

    @BeforeEach
    void setUp() {
        postRepository = mock(PostRepository.class);
        postService = new PostServiceImpl(postRepository);
    }

    @Test
    @DisplayName("Should create a post successfully")
    void testCreatePost() {
        // Arrange
        CreatePostRequest request = new CreatePostRequest(
                "Test Post",
                "tech",
                "This is a test post",
                "https://medium.com/@user/test-post",
                "John Doe",
                true
        );

        Post savedPost = Post.builder()
                .id(1L)
                .title("Test Post")
                .category("tech")
                .content("This is a test post")
                .sourceUrl("https://medium.com/@user/test-post")
                .author("John Doe")
                .published(true)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        when(postRepository.save(any(Post.class))).thenReturn(savedPost);

        // Act
        PostDTO result = postService.createPost(request);

        // Assert
        assertNotNull(result);
        assertEquals("Test Post", result.getTitle());
        assertEquals("tech", result.getCategory());
        verify(postRepository, times(1)).save(any(Post.class));
    }

    @Test
    @DisplayName("Should throw exception for invalid URL on create")
    void testCreatePostWithInvalidUrl() {
        // Arrange
        CreatePostRequest request = new CreatePostRequest(
                "Test Post",
                "tech",
                "Content",
                "invalid-url",
                "Author",
                false
        );

        // Act & Assert
        assertThrows(InvalidUrlException.class, () ->
                postService.createPost(request)
        );
        verify(postRepository, never()).save(any(Post.class));
    }

    @Test
    @DisplayName("Should update a post successfully")
    void testUpdatePost() {
        // Arrange
        UpdatePostRequest request = new UpdatePostRequest(
                1L,
                "Updated Title",
                "youtube",
                "Updated content",
                "https://youtube.com/watch?v=xyz",
                "Jane Doe",
                true
        );

        Post existingPost = Post.builder()
                .id(1L)
                .title("Old Title")
                .build();

        when(postRepository.findById(1L)).thenReturn(Optional.of(existingPost));

        // Act
        PostDTO result = postService.updatePost(request);

        // Assert
        assertNotNull(result);
        assertEquals("Updated Title", result.getTitle());
        verify(postRepository, times(1)).findById(1L);
        verify(postRepository, times(1)).update(any(Post.class));
    }

    @Test
    @DisplayName("Should throw exception when updating non-existent post")
    void testUpdateNonExistentPost() {
        // Arrange
        UpdatePostRequest request = new UpdatePostRequest(
                999L,
                "Title",
                "category",
                "content",
                "https://example.com",
                "author",
                false
        );

        when(postRepository.findById(999L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(PostNotFoundException.class, () ->
                postService.updatePost(request)
        );
    }

    @Test
    @DisplayName("Should get post by ID")
    void testGetPostById() {
        // Arrange
        Post post = Post.builder()
                .id(1L)
                .title("Test Post")
                .category("tech")
                .build();

        when(postRepository.findById(1L)).thenReturn(Optional.of(post));

        // Act
        PostDTO result = postService.getPostById(1L);

        // Assert
        assertNotNull(result);
        assertEquals("Test Post", result.getTitle());
    }

    @Test
    @DisplayName("Should throw exception when getting non-existent post")
    void testGetNonExistentPost() {
        // Arrange
        when(postRepository.findById(999L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(PostNotFoundException.class, () ->
                postService.getPostById(999L)
        );
    }

    @Test
    @DisplayName("Should get all posts")
    void testGetAllPosts() {
        // Arrange
        List<Post> posts = Arrays.asList(
                Post.builder().id(1L).title("Post 1").build(),
                Post.builder().id(2L).title("Post 2").build()
        );

        when(postRepository.findAll()).thenReturn(posts);

        // Act
        List<PostDTO> result = postService.getAllPosts();

        // Assert
        assertEquals(2, result.size());
        verify(postRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("Should get published posts")
    void testGetPublishedPosts() {
        // Arrange
        List<Post> posts = Arrays.asList(
                Post.builder().id(1L).title("Published Post").published(true).build()
        );

        when(postRepository.findByPublished(true)).thenReturn(posts);

        // Act
        List<PostDTO> result = postService.getPublishedPosts();

        // Assert
        assertEquals(1, result.size());
        verify(postRepository, times(1)).findByPublished(true);
    }

    @Test
    @DisplayName("Should delete post by ID")
    void testDeletePost() {
        // Arrange
        Post post = Post.builder().id(1L).title("Test Post").build();
        when(postRepository.findById(1L)).thenReturn(Optional.of(post));

        // Act
        postService.deletePost(1L);

        // Assert
        verify(postRepository, times(1)).findById(1L);
        verify(postRepository, times(1)).deleteById(1L);
    }

    @Test
    @DisplayName("Should throw exception when deleting non-existent post")
    void testDeleteNonExistentPost() {
        // Arrange
        when(postRepository.findById(999L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(PostNotFoundException.class, () ->
                postService.deletePost(999L)
        );
    }
}
