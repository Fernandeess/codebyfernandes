import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { PostFormComponent } from './post-form.component';
import { PostService, Post } from '../../services/post.service';

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;
  let postService: jasmine.SpyObj<PostService>;

  beforeEach(async () => {
    const postServiceSpy = jasmine.createSpyObj('PostService', [
      'createPost',
      'updatePost'
    ]);

    await TestBed.configureTestingModule({
      imports: [PostFormComponent, ReactiveFormsModule],
      providers: [
        { provide: PostService, useValue: postServiceSpy }
      ]
    }).compileComponents();

    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form in create mode', () => {
    fixture.detectChanges();
    expect(component.isEditMode).toBe(false);
    expect(component.getFormTitle()).toBe('Create New Post');
  });

  it('should initialize form in edit mode when selectedPost is provided', () => {
    const mockPost: Post = {
      id: 1,
      title: 'Test',
      category: 'tech',
      content: 'Content',
      sourceUrl: 'https://example.com',
      author: 'Author',
      published: true
    };

    component.selectedPost = mockPost;
    fixture.detectChanges();

    expect(component.isEditMode).toBe(true);
    expect(component.getFormTitle()).toBe('Edit Post');
  });

  it('should create post on submit', () => {
    postService.createPost.and.returnValue(of({} as Post));

    fixture.detectChanges();

    component.form.patchValue({
      title: 'New Post',
      category: 'tech',
      content: 'This is a test post content',
      sourceUrl: 'https://medium.com/test',
      author: 'John',
      published: true
    });

    component.onSubmit();

    expect(postService.createPost).toHaveBeenCalled();
  });

  it('should update post on submit', () => {
    const mockPost: Post = {
      id: 1,
      title: 'Test',
      category: 'tech',
      content: 'Content',
      sourceUrl: 'https://example.com',
      author: 'Author',
      published: true
    };

    component.selectedPost = mockPost;
    postService.updatePost.and.returnValue(of({} as Post));

    fixture.detectChanges();

    component.form.patchValue({
      title: 'Updated',
      category: 'youtube',
      content: 'Updated content here',
      sourceUrl: 'https://youtube.com/watch?v=test',
      author: 'Jane',
      published: false
    });

    component.onSubmit();

    expect(postService.updatePost).toHaveBeenCalledWith(1, jasmine.any(Object));
  });

  it('should emit onSuccess when form submitted successfully', () => {
    spyOn(component.onSuccess, 'emit');
    postService.createPost.and.returnValue(of({} as Post));

    fixture.detectChanges();

    component.form.patchValue({
      title: 'New Post',
      category: 'tech',
      content: 'This is a test post content',
      sourceUrl: 'https://medium.com/test',
      author: 'John',
      published: true
    });

    component.onSubmit();

    expect(component.onSuccess.emit).toHaveBeenCalled();
  });

  it('should emit onCancel when cancel is clicked', () => {
    spyOn(component.onCancel, 'emit');

    component.onCancelClick();

    expect(component.onCancel.emit).toHaveBeenCalled();
  });
});
