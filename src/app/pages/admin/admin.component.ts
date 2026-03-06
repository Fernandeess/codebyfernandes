import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PostService, Post } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { PostFormComponent } from '../../components/post-form/post-form.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, PostFormComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  posts: Post[] = [];
  loading = false;
  selectedPost: Post | null = null;
  showForm = false;
  currentUser: string | null = null;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUsername();
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data.sort((a, b) => {
          const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime();
          const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime();
          return dateB - dateA;
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading posts:', error);
        this.loading = false;
      }
    });
  }

  onNewPost(): void {
    this.selectedPost = null;
    this.showForm = true;
  }

  onEditPost(post: Post): void {
    this.selectedPost = post;
    this.showForm = true;
  }

  onDeletePost(post: Post): void {
    if (post.id && confirm(`Are you sure you want to delete "${post.title}"?`)) {
      this.postService.deletePost(post.id).subscribe({
        next: () => {
          this.posts = this.posts.filter(p => p.id !== post.id);
        },
        error: (error) => {
          console.error('Error deleting post:', error);
          alert('Failed to delete post');
        }
      });
    }
  }

  onFormCancel(): void {
    this.showForm = false;
    this.selectedPost = null;
  }

  onFormSuccess(): void {
    this.showForm = false;
    this.selectedPost = null;
    this.loadPosts();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getStatusBadgeClass(published: boolean): string {
    return published ? 'badge-published' : 'badge-draft';
  }

  getStatusText(published: boolean): string {
    return published ? 'Published' : 'Draft';
  }

  getCategoryLabel(category: string): string {
    const categoryLabels: { [key: string]: string } = {
      'tech': 'Tech',
      'youtube': 'YouTube',
      'pop-culture': 'Pop Culture'
    };
    return categoryLabels[category] || category;
  }

  getCategoryBadgeClass(category: string): string {
    return `badge-${category}`;
  }
}
