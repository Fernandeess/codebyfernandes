import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService, Post } from '../../services/post.service';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  @Input() selectedPost: Post | null = null;
  @Output() onCancel = new EventEmitter<void>();
  @Output() onSuccess = new EventEmitter<void>();

  form!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  isEditMode = false;

  categories = [
    { value: 'tech', label: 'Tech' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'pop-culture', label: 'Pop Culture' }
  ];

  constructor(
    private fb: FormBuilder,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.selectedPost) {
      this.isEditMode = true;
      this.form.patchValue(this.selectedPost);
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(10)]],
      sourceUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.*/)]],
      author: ['', [Validators.required, Validators.minLength(2)]],
      published: [false]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    if (this.isEditMode && this.selectedPost?.id) {
      // Update existing post
      this.postService.updatePost(this.selectedPost.id, this.form.value).subscribe({
        next: () => {
          this.loading = false;
          this.onSuccess.emit();
        },
        error: (error) => {
          this.error = 'Failed to update post. Please try again.';
          this.loading = false;
        }
      });
    } else {
      // Create new post
      this.postService.createPost(this.form.value).subscribe({
        next: () => {
          this.loading = false;
          this.onSuccess.emit();
        },
        error: (error) => {
          this.error = 'Failed to create post. Please try again.';
          this.loading = false;
        }
      });
    }
  }

  onCancelClick(): void {
    this.onCancel.emit();
  }

  getFormTitle(): string {
    return this.isEditMode ? 'Edit Post' : 'Create New Post';
  }

  getSubmitButtonText(): string {
    return this.isEditMode ? 'Update Post' : 'Create Post';
  }
}
