# 🏗️ Arquitetura Hexagonal - Blog Management System

## Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Angular 17)                    │
├─────────────────────────────────────────────────────────────────┤
│  Login Component   │  Admin Dashboard   │  Blog Component       │
│  ↓                 │  ↓                │  ↓                   │
│  AuthService       │  PostService      │  PostService        │
│  ↓                 │  ↓                │  ↓                   │
│  AuthInterceptor   │  AuthGuard        │  (Public Access)    │
│                    │                    │                    │
└──────────────────────────────────────────────────────────────────┘
                              ↓↑ HTTP(S)
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND (Spring Boot 3.2)                   │
├─────────────────────────────────────────────────────────────────┤
│
│  ┌──────────────────────────────────────────────────────────┐
│  │                  ADAPTERS LAYER (IN)                     │
│  │  ┌──────────────────────┐    ┌──────────────────────┐   │
│  │  │  AuthController      │    │  PostController      │   │
│  │  │  ├─ POST /login      │    │  ├─ GET /posts       │   │
│  │  │  └─ JWT Validation   │    │  ├─ POST /posts      │   │
│  │  └──────────────────────┘    │  ├─ PUT /posts/{id}  │   │
│  │                              │  └─ DELETE /posts/{id}   │
│  │  ┌──────────────────────┐    └──────────────────────┘   │
│  │  │ JwtAuthenticationAdapter  │                         │
│  │  │ (implements AuthPort)     │                         │
│  │  └──────────────────────┘                               │
│  └──────────────────────────────────────────────────────────┘
│                            ↓↑
│  ┌──────────────────────────────────────────────────────────┐
│  │              APPLICATION LAYER (Use Cases)               │
│  │  ┌──────────────────────────────────────────────────┐   │
│  │  │          PostServiceImpl                          │   │
│  │  │  ├─ createPost()      (input port)               │   │
│  │  │  ├─ updatePost()      (input port)               │   │
│  │  │  ├─ getPostById()     (input port)               │   │
│  │  │  ├─ getAllPosts()     (input port)               │   │
│  │  │  ├─ deletePost()      (input port)               │   │
│  │  │  ├─ validateUrl()     (business logic)           │   │
│  │  │  └─ mapToDTO()        (data mapping)             │   │
│  │  └──────────────────────────────────────────────────┘   │
│  │                            ↓↑
│  │  ┌──────────────────────────────────────────────────┐   │
│  │  │     DTOs (Data Transfer Objects)                │   │
│  │  │  ├─ PostDTO          (output)                   │   │
│  │  │  ├─ CreatePostRequest (input)                   │   │
│  │  │  ├─ UpdatePostRequest (input)                   │   │
│  │  │  └─ AuthResponse     (authentication)           │   │
│  │  └──────────────────────────────────────────────────┘   │
│  └──────────────────────────────────────────────────────────┘
│                            ↓↑
│  ┌──────────────────────────────────────────────────────────┐
│  │              DOMAIN LAYER (Business Rules)               │
│  │  ┌──────────────────┐      ┌──────────────────────────┐ │
│  │  │  Post Entity     │      │  PostRepository (Port)   │ │
│  │  │  ├─ id           │      │  ├─ save()              │ │
│  │  │  ├─ title        │      │  ├─ findById()          │ │
│  │  │  ├─ category     │      │  ├─ findAll()           │ │
│  │  │  ├─ content      │      │  ├─ findByPublished()   │ │
│  │  │  ├─ sourceUrl    │      │  ├─ deleteById()        │ │
│  │  │  ├─ author       │      │  └─ update()            │ │
│  │  │  ├─ published    │      │  (output port)          │ │
│  │  │  ├─ createdAt    │      └──────────────────────────┘ │
│  │  │  └─ updatedAt    │                                   │
│  │  └──────────────────┘      ┌──────────────────────────┐ │
│  │                            │  Domain Exceptions       │ │
│  │                            │  ├─ PostNotFoundException│ │
│  │                            │  └─ InvalidUrlException │ │
│  │                            └──────────────────────────┘ │
│  └──────────────────────────────────────────────────────────┘
│                            ↓↑
│  ┌──────────────────────────────────────────────────────────┐
│  │                 ADAPTERS LAYER (OUT)                     │
│  │  ┌──────────────────────────────────────────────────┐   │
│  │  │      PostRepositoryAdapter                       │   │
│  │  │      (implements PostRepository)                 │   │
│  │  │      ├─ Post → PostEntity mapping                │   │
│  │  │      └─ PostEntity → Post mapping                │   │
│  │  └──────────────────────────────────────────────────┘   │
│  │                            ↓↑
│  │  ┌──────────────────────────────────────────────────┐   │
│  │  │       JpaPostRepository                          │   │
│  │  │       (Spring Data JPA)                          │   │
│  │  │       ├─ JpaRepository<PostEntity, Long>         │   │
│  │  │       └─ findByPublished()                       │   │
│  │  └──────────────────────────────────────────────────┘   │
│  └──────────────────────────────────────────────────────────┘
│                            ↓↑
│  ┌──────────────────────────────────────────────────────────┐
│  │              PERSISTENCE (H2 Database)                   │
│  │  ┌──────────────────────────────────────────────────┐   │
│  │  │            POSTS Table                           │   │
│  │  │  ├─ id (PK)                                      │   │
│  │  │  ├─ title                                        │   │
│  │  │  ├─ category                                     │   │
│  │  │  ├─ content                                      │   │
│  │  │  ├─ source_url                                   │   │
│  │  │  ├─ author                                       │   │
│  │  │  ├─ published                                    │   │
│  │  │  ├─ created_at                                   │   │
│  │  │  └─ updated_at                                   │   │
│  │  └──────────────────────────────────────────────────┘   │
│  └──────────────────────────────────────────────────────────┘
│
└─────────────────────────────────────────────────────────────────┘
```

## Fluxo de Dados - Criar um Post

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Frontend - User fills form                              │
│    PostFormComponent → onSubmit()                           │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. Frontend - HTTP Request                                 │
│    PostService → createPost(CreatePostRequest)             │
│    + AuthInterceptor adds Bearer token                      │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. Backend - REST Controller                               │
│    PostController → createPost(@Valid CreatePostRequest)   │
│    + @PreAuthorize validates JWT token                     │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. Application Layer - Business Logic                      │
│    PostServiceImpl → createPost(CreatePostRequest)          │
│    ├─ validateUrl() [Domain Logic]                         │
│    ├─ mapToEntity()                                        │
│    ├─ postRepository.save() [Output Port Call]             │
│    └─ mapToDTO() [Return Response]                         │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. Adapter - Repository Persistence                        │
│    PostRepositoryAdapter → save(Post)                      │
│    ├─ mapToEntity() [Post → PostEntity]                    │
│    └─ jpaPostRepository.save(PostEntity)                   │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 6. Database Layer                                          │
│    INSERT INTO posts (title, category, content, ...)       │
│    RETURNING id                                             │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 7. Response Flow (Reverse)                                 │
│    PostEntity → mapToDomain() → PostDTO → JSON → Frontend  │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 8. Frontend - Update UI                                     │
│    AdminComponent → loadPosts() → Refresh table            │
└─────────────────────────────────────────────────────────────┘
```

## Fluxo de Autenticação

```
┌──────────────────┐
│  LoginComponent  │
│                  │
│  username input  │
│  password input  │
└────────┬─────────┘
         │
         ↓
┌──────────────────┐
│  AuthService     │
│  login(creds)    │
│  POST /api/auth/login
└────────┬─────────┘
         │
         ↓
┌──────────────────────────────────┐
│  AuthController                  │
│  POST /api/auth/login            │
│  JwtAuthenticationAdapter        │
│  ├─ authenticate(user, pass)     │
│  │  ├─ validate credentials      │
│  │  └─ JwtTokenProvider.generate │
│  └─ return JWT token             │
└────────┬─────────────────────────┘
         │
         ↓
┌──────────────────────────────────┐
│  AuthService (Frontend)          │
│  ├─ Save token → localStorage    │
│  ├─ Save username → localStorage │
│  └─ Emit currentUser$ event      │
└────────┬─────────────────────────┘
         │
         ↓
┌──────────────────────────────────┐
│  Router                          │
│  navigate(['/admin'])            │
│  AuthGuard checks token          │
│  ├─ isAuthenticated() ✅         │
│  └─ Allow navigation             │
└────────┬─────────────────────────┘
         │
         ↓
┌──────────────────────────────────┐
│  AdminComponent                  │
│  loadPosts()                     │
│  ├─ PostService.getAllPosts()    │
│  ├─ AuthInterceptor adds:        │
│  │  Authorization: Bearer <JWT>  │
│  └─ Success → Render table       │
└──────────────────────────────────┘
```

## Key Design Principles

### 1. **Separation of Concerns**
- Domain Layer: Pure business rules (no frameworks)
- Application Layer: Use cases and orchestration
- Adapter Layer: External integrations (REST, Database)

### 2. **Dependency Injection**
```java
// Domain doesn't know about JPA
public interface PostRepository { ... }

// Application depends on interface (not implementation)
public PostServiceImpl(PostRepository repository) { ... }

// Adapter provides the implementation
@Component
public class PostRepositoryAdapter implements PostRepository { ... }
```

### 3. **Ports & Adapters**
- **Input Ports**: Services that receive requests
- **Output Ports**: Repositories for persistence
- **Adapters**: Convert between protocols and implementations

### 4. **Security Layers**
```
Request → AuthFilter (validate JWT)
       → AuthGuard (check authorization)
       → @PreAuthorize (method-level security)
       → Business Logic
```

## Testing Strategy

```
┌─────────────────────────────┐
│  Unit Tests (JUnit 5)       │
├─────────────────────────────┤
│ ✓ JwtAuthenticationAdapterTest
│   ├─ Valid credentials
│   ├─ Invalid username
│   ├─ Invalid password
│   └─ Token provider failure
│
│ ✓ PostServiceImplTest
│   ├─ Create post
│   ├─ Update post
│   ├─ Delete post
│   ├─ Get posts
│   ├─ Validate URL
│   └─ Exception handling
│
│ ✓ Frontend Component Tests
│   ├─ LoginComponent
│   ├─ AdminComponent
│   ├─ BlogComponent
│   └─ PostFormComponent
└─────────────────────────────┘
```

## Directory Structure

```
backend/
├── src/main/java/com/codebyfernandes/
│   ├── BlogApiApplication.java
│   ├── domain/
│   │   ├── entities/Post.java
│   │   ├── repositories/PostRepository.java (interface)
│   │   └── exceptions/
│   │       ├── PostNotFoundException.java
│   │       └── InvalidUrlException.java
│   ├── application/
│   │   ├── dto/
│   │   │   ├── PostDTO.java
│   │   │   ├── CreatePostRequest.java
│   │   │   ├── UpdatePostRequest.java
│   │   │   ├── LoginRequest.java
│   │   │   └── AuthResponse.java
│   │   ├── ports/
│   │   │   ├── PostService.java (interface)
│   │   │   └── AuthenticationPort.java (interface)
│   │   └── services/PostServiceImpl.java
│   ├── adapters/
│   │   ├── in/rest/
│   │   │   ├── PostController.java
│   │   │   ├── AuthController.java
│   │   │   └── JwtAuthenticationAdapter.java
│   │   └── out/persistence/
│   │       ├── PostEntity.java
│   │       ├── JpaPostRepository.java
│   │       └── PostRepositoryAdapter.java
│   ├── security/
│   │   ├── JwtTokenProvider.java
│   │   └── JwtAuthenticationFilter.java
│   └── config/SecurityConfig.java
├── src/test/java/...
└── src/main/resources/application.yml

frontend/src/app/
├── services/
│   ├── auth.service.ts
│   ├── auth.guard.ts
│   ├── auth.interceptor.ts
│   └── post.service.ts
├── pages/
│   ├── login/
│   ├── admin/
│   ├── blog/
│   └── (others...)
├── components/
│   └── post-form/
└── app.routes.ts
```
