import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService, Post } from '../../services/post.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  loading = false;
  selectedCategory: string = 'all';

  categories = [
    { value: 'all', label: 'All Posts' },
    { value: 'tech', label: 'Tech' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'pop-culture', label: 'Pop Culture' }
  ];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.postService.getPublishedPosts().subscribe({
      next: (data) => {
        this.posts = data.sort((a, b) => {
          const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime();
          const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime();
          return dateB - dateA;
        });
        this.filterPosts();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading posts:', error);
        this.loading = false;
      }
    });
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.filterPosts();
  }

  private filterPosts(): void {
    if (this.selectedCategory === 'all') {
      this.filteredPosts = [...this.posts];
    } else {
      this.filteredPosts = this.posts.filter(p => p.category === this.selectedCategory);
    }
  }

  getCategoryLabel(category: string): string {
    const categoryLabels: { [key: string]: string } = {
      'tech': 'Technology',
      'youtube': 'YouTube',
      'pop-culture': 'Pop Culture'
    };
    return categoryLabels[category] || category;
  }

  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'tech': '#007bff',
      'youtube': '#ff0000',
      'pop-culture': '#472ba3'
    };
    return colors[category] || '#666';
  }

  openPost(post: Post): void {
    if (post.sourceUrl) {
      window.open(post.sourceUrl, '_blank');
    }
  }

  getSource(url: string): string {
    if (url.includes('medium.com')) return 'Medium';
    if (url.includes('dev.to')) return 'Dev.to';
    if (url.includes('youtube.com')) return 'YouTube';
    if (url.includes('youtu.be')) return 'YouTube';
    return 'External';
  }
}
