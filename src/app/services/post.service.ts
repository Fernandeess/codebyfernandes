import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  id?: number;
  title: string;
  category: string;
  content: string;
  sourceUrl: string;
  author: string;
  createdAt?: string;
  updatedAt?: string;
  published: boolean;
}

export interface CreatePostRequest {
  title: string;
  category: string;
  content: string;
  sourceUrl: string;
  author: string;
  published: boolean;
}

export interface UpdatePostRequest extends CreatePostRequest {
  id: number;
}

/**
 * Post Service
 * Handles all HTTP requests related to blog posts
 */
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) {}

  /**
   * Get all posts (including unpublished - admin only)
   */
  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  /**
   * Get published posts only
   */
  getPublishedPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/published`);
  }

  /**
   * Get single post by ID
   */
  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create new post
   */
  createPost(request: CreatePostRequest): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, request);
  }

  /**
   * Update existing post
   */
  updatePost(id: number, request: UpdatePostRequest): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, request);
  }

  /**
   * Delete post
   */
  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
