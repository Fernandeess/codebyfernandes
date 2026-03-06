import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BlogComponent } from './blog.component';
import { PostService, Post } from '../../services/post.service';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;
  let postService: jasmine.SpyObj<PostService>;

  const mockPosts: Post[] = [
    {
      id: 1,
      title: 'Angular Best Practices',
      category: 'tech',
      content: 'Learn the best practices for Angular development',
      sourceUrl: 'https://medium.com/@user/angular-best-practices',
      author: 'John Doe',
      published: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 2,
      title: 'My Latest Video',
      category: 'youtube',
      content: 'Check out my latest YouTube video',
      sourceUrl: 'https://youtube.com/watch?v=xyz',
      author: 'Jane Doe',
      published: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  beforeEach(async () => {
    const postServiceSpy = jasmine.createSpyObj('PostService', ['getPublishedPosts']);

    await TestBed.configureTestingModule({
      imports: [BlogComponent],
      providers: [
        { provide: PostService, useValue: postServiceSpy }
      ]
    }).compileComponents();

    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    postService.getPublishedPosts.and.returnValue(of(mockPosts));

    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load published posts on init', () => {
    fixture.detectChanges();
    expect(postService.getPublishedPosts).toHaveBeenCalled();
    expect(component.posts.length).toBe(2);
  });

  it('should filter posts by category', () => {
    fixture.detectChanges();

    component.onCategoryChange('tech');

    expect(component.selectedCategory).toBe('tech');
    expect(component.filteredPosts.length).toBe(1);
    expect(component.filteredPosts[0].category).toBe('tech');
  });

  it('should show all posts when category is "all"', () => {
    fixture.detectChanges();

    component.onCategoryChange('all');

    expect(component.selectedCategory).toBe('all');
    expect(component.filteredPosts.length).toBe(2);
  });

  it('should detect source correctly', () => {
    expect(component.getSource('https://medium.com/article')).toBe('Medium');
    expect(component.getSource('https://dev.to/article')).toBe('Dev.to');
    expect(component.getSource('https://youtube.com/watch?v=xyz')).toBe('YouTube');
    expect(component.getSource('https://example.com')).toBe('External');
  });
});
