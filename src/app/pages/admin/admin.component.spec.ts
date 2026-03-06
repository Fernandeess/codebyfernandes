import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AdminComponent } from './admin.component';
import { PostService, Post } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let postService: jasmine.SpyObj<PostService>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  const mockPosts: Post[] = [
    {
      id: 1,
      title: 'Test Post',
      category: 'tech',
      content: 'Content',
      sourceUrl: 'https://medium.com/test',
      author: 'John',
      published: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  beforeEach(async () => {
    const postServiceSpy = jasmine.createSpyObj('PostService', [
      'getAllPosts',
      'deletePost'
    ]);
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'getCurrentUsername',
      'logout'
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AdminComponent],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    postService.getAllPosts.and.returnValue(of(mockPosts));
    authService.getCurrentUsername.and.returnValue('admin');

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load posts on init', () => {
    fixture.detectChanges();
    expect(postService.getAllPosts).toHaveBeenCalled();
    expect(component.posts.length).toBe(1);
  });

  it('should display new post form when onNewPost is called', () => {
    component.onNewPost();
    expect(component.showForm).toBe(true);
    expect(component.selectedPost).toBeNull();
  });

  it('should delete post with confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    postService.deletePost.and.returnValue(of(void 0));

    fixture.detectChanges();
    const post = mockPosts[0];
    component.onDeletePost(post);

    expect(postService.deletePost).toHaveBeenCalledWith(post.id);
  });

  it('should logout and navigate to login', () => {
    component.onLogout();
    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
