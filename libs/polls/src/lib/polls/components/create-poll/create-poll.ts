import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { CreatePoll as CreatePollRequest, CreatePollOption } from '../../models/polls';

interface CreatePollResponse {
  id: string;
  message?: string;
}

@Component({
  selector: 'lib-create-poll',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTooltipModule,
  ],
  template: `
    <div class="min-h-screen bg-gray-50 py-8 px-4">
      <div class="max-w-4xl mx-auto">
        <!-- Header Section -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <mat-icon class="text-3xl text-primary">ballot</mat-icon>
          </div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Create New Poll</h1>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Design an engaging poll to gather opinions and insights from your audience
          </p>
        </div>

        <mat-card class="shadow-xl border-0 overflow-hidden">
          <!-- Progress Indicator -->
          <div class="h-1 bg-gray-100">
            <div class="h-full bg-primary transition-all duration-300" 
                 [style.width.%]="getFormProgress()"></div>
          </div>
          
          <mat-card-content class="p-8">
            <form [formGroup]="pollForm" (ngSubmit)="onSubmit()" class="space-y-8">
              <!-- Basic Information Section -->
              <div class="my-6">
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span class="text-white text-sm font-medium">1</span>
                  </div>
                  <h2 class="text-xl font-semibold text-gray-900">Basic Information</h2>
                </div>

                <!-- Poll Name -->
                <mat-form-field class="w-full">
                  <mat-label>Poll Title</mat-label>
                  <input matInput 
                         formControlName="name" 
                         placeholder="Enter a compelling title for your poll"
                         required>
                  <mat-icon matSuffix class="text-gray-400">title</mat-icon>
                  @if (pollForm.get('name')?.hasError('required') && pollForm.get('name')?.touched) {
                    <mat-error>Poll title is required</mat-error>
                  }
                  @if (pollForm.get('name')?.hasError('minlength') && pollForm.get('name')?.touched) {
                    <mat-error>Title must be at least 3 characters long</mat-error>
                  }
                  <mat-hint>{{ pollForm.get('name')?.value?.length || 0 }}/100 characters</mat-hint>
                </mat-form-field>

                <!-- Poll Question -->
                <mat-form-field class="w-full">
                  <mat-label>Question</mat-label>
                  <textarea matInput 
                            formControlName="question" 
                            placeholder="What question would you like to ask your audience?"
                            rows="4"
                            required></textarea>
                  <mat-icon matSuffix class="text-gray-400">help_outline</mat-icon>
                  @if (pollForm.get('question')?.hasError('required') && pollForm.get('question')?.touched) {
                    <mat-error>Question is required</mat-error>
                  }
                  @if (pollForm.get('question')?.hasError('minlength') && pollForm.get('question')?.touched) {
                    <mat-error>Question must be at least 10 characters long</mat-error>
                  }
                  <mat-hint>{{ pollForm.get('question')?.value?.length || 0 }}/500 characters</mat-hint>
                </mat-form-field>

                <!-- Owner -->
                <mat-form-field class="w-full">
                  <mat-label>Poll Owner</mat-label>
                  <input matInput 
                         formControlName="owner" 
                         placeholder="Your name or organization"
                         required>
                  <mat-icon matSuffix class="text-gray-400">person</mat-icon>
                  @if (pollForm.get('owner')?.hasError('required') && pollForm.get('owner')?.touched) {
                    <mat-error>Owner is required</mat-error>
                  }
                </mat-form-field>
              </div>

              <mat-divider class="my-8 mb-6"></mat-divider>

              <!-- Poll Options Section -->
              <div class="my-4">
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span class="text-white text-sm font-medium">2</span>
                  </div>
                  <div class="flex-1">
                    <h2 class="text-xl font-semibold text-gray-900">Poll Options</h2>
                    <p class="text-sm text-gray-600 mt-1">Add 2-10 options for your poll</p>
                  </div>
                  <div class="text-right">
                    <span class="text-sm font-medium text-gray-700">{{ optionsArray.length }}/10</span>
                    <div class="w-16 h-2 bg-gray-200 rounded-full mt-1">
                      <div class="h-full bg-primary rounded-full transition-all duration-300" 
                           [style.width.%]="(optionsArray.length / 10) * 100"></div>
                    </div>
                  </div>
                </div>
                
                <div formArrayName="options" class="space-y-4">
                  @for (option of optionsArray.controls; track $index; let i = $index) {
                    <div class="group">
                      <div class="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary/30 hover:bg-gray-50/50 transition-all duration-200">
                        <div class="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mt-2 group-hover:bg-primary/10">
                          <span class="text-sm font-medium text-gray-600 group-hover:text-primary">{{ i + 1 }}</span>
                        </div>
                        <div class="flex-1">
                          <mat-form-field class="w-full">
                            <mat-label>Option {{ i + 1 }}</mat-label>
                            <input matInput 
                                   [formControlName]="i"
                                   [placeholder]="getOptionPlaceholder(i)"
                                   required>
                            @if (option.hasError('required') && option.touched) {
                              <mat-error>This option is required</mat-error>
                            }
                          </mat-form-field>
                        </div>
                        
                        @if (optionsArray.length > 2) {
                          <button type="button" 
                                  mat-icon-button 
                                  color="warn"
                                  (click)="removeOption(i)"
                                  class="mt-2 opacity-60 hover:opacity-100 transition-opacity"
                                  matTooltip="Remove this option">
                            <mat-icon>delete_outline</mat-icon>
                          </button>
                        }
                      </div>
                    </div>
                  }
                </div>
                
                @if (optionsArray.length < 10) {
                  <button type="button" 
                          mat-stroked-button 
                          (click)="addOption()"
                          class="w-full h-14 border-2 border-dashed border-gray-300 hover:border-primary hover:bg-primary/5 transition-all duration-200 my-6">
                    <mat-icon class="mr-2">add_circle_outline</mat-icon>
                    Add Another Option
                  </button>
                } @else {
                  <div class="text-center p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <mat-icon class="text-amber-600 mb-2">info</mat-icon>
                    <p class="text-sm text-amber-800">Maximum of 10 options reached</p>
                  </div>
                }
              </div>
            </form>
          </mat-card-content>
          
          <mat-card-actions class="px-8 py-6 bg-gray-50 border-t">
            <div class="flex justify-between items-center w-full">
              <button type="button" 
                      mat-button 
                      color="primary"
                      (click)="onCancel()"
                      [disabled]="isSubmitting()"
                      class="px-8">
                <mat-icon class="mr-2">arrow_back</mat-icon>
                Cancel
              </button>
              
              <div class="flex gap-3">
                <button type="button" 
                        mat-stroked-button 
                        color="primary"
                        (click)="previewPoll()"
                        [disabled]="pollForm.invalid"
                        class="px-6">
                  <mat-icon class="mr-2">preview</mat-icon>
                  Preview
                </button>
                
                <button type="submit" 
                        mat-raised-button 
                        color="primary"
                        (click)="onSubmit()"
                        [disabled]="pollForm.invalid || isSubmitting()"
                        class="px-8 min-w-32">
                  @if (isSubmitting()) {
                    <mat-spinner diameter="20" class="mr-2"></mat-spinner>
                    Creating...
                  } @else {
                    <ng-container>
                      <mat-icon class="mr-2">publish</mat-icon>
                      Create Poll
                    </ng-container>
                  }
                </button>
              </div>
            </div>
          </mat-card-actions>
        </mat-card>

        <!-- Preview Modal -->
        @if (showPreview()) {
          <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" 
               tabindex="0"
               (click)="closePreview()"
               (keydown)="onKeydownClosePreview($event)"
               role="dialog"
               aria-modal="true"
               aria-labelledby="preview-title">
            <mat-card class="max-w-2xl w-full max-h-[90vh] overflow-auto" 
                     (click)="$event.stopPropagation()">
              <mat-card-header class="pb-4">
                <mat-card-title id="preview-title" class="flex items-center justify-between">
                  <span>Poll Preview</span>
                  <button mat-icon-button (click)="closePreview()" aria-label="Close preview">
                    <mat-icon>close</mat-icon>
                  </button>
                </mat-card-title>
              </mat-card-header>
              
              <mat-card-content>
                <div class="space-y-4">
                  <h2 class="text-xl font-semibold text-gray-900">{{ pollForm.get('name')?.value }}</h2>
                  <p class="text-gray-700">{{ pollForm.get('question')?.value }}</p>
                  <p class="text-sm text-gray-600">
                    <mat-icon class="text-base mr-1 align-text-bottom">person</mat-icon>
                    Created by {{ pollForm.get('owner')?.value }}
                  </p>
                  
                  <div class="space-y-2 mt-6">
                    <h3 class="font-medium text-gray-900">Options:</h3>
                    @for (option of getValidOptions(); track $index; let i = $index) {
                      <div class="flex items-center p-3 border border-gray-200 rounded-lg">
                        <div class="w-6 h-6 border-2 border-gray-300 rounded mr-3"></div>
                        <span>{{ option }}</span>
                      </div>
                    }
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        }
      </div>
    </div>
  `,
})
export class CreatePoll {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  pollForm!: FormGroup;
  isSubmitting = signal(false);
  showPreview = signal(false);

  constructor() {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.pollForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      question: ['', [Validators.required, Validators.minLength(10)]],
      owner: ['', [Validators.required]],
      options: this.fb.array([
        this.fb.control('', [Validators.required]),
        this.fb.control('', [Validators.required])
      ])
    });
  }

  get optionsArray(): FormArray {
    return this.pollForm.get('options') as FormArray;
  }

  getFormProgress(): number {
    const controls = this.pollForm.controls;
    const totalFields = Object.keys(controls).length;
    let validFields = 0;

    // Check basic form controls
    Object.keys(controls).forEach(key => {
      if (key !== 'options') {
        const control = controls[key];
        if (control.valid && control.value?.trim()?.length > 0) {
          validFields++;
        }
      }
    });

    // Check options array - count as valid if at least 2 options are filled
    const validOptions = this.getValidOptions();
    if (validOptions.length >= 2) {
      validFields++;
    }

    return (validFields / totalFields) * 100;
  }

  getOptionPlaceholder(index: number): string {
    const placeholders = [
      'e.g., Option A',
      'e.g., Option B', 
      'e.g., Option C',
      'e.g., Option D',
      'e.g., Option E',
      'e.g., Option F',
      'e.g., Option G',
      'e.g., Option H',
      'e.g., Option I',
      'e.g., Option J'
    ];
    return placeholders[index] || `Option ${index + 1}`;
  }

  getValidOptions(): string[] {
    return this.optionsArray.value
      .filter((option: string) => option && option.trim().length > 0)
      .map((option: string) => option.trim());
  }

  previewPoll(): void {
    if (this.pollForm.valid) {
      this.showPreview.set(true);
    }
  }

  closePreview(): void {
    this.showPreview.set(false);
  }

  onKeydownClosePreview(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closePreview();
    }
  }

  addOption(): void {
    if (this.optionsArray.length < 10) {
      this.optionsArray.push(this.fb.control('', [Validators.required]));
    } else {
      this.snackBar.open('Maximum 10 options allowed', 'OK', { duration: 3000 });
    }
  }

  removeOption(index: number): void {
    if (this.optionsArray.length > 2) {
      this.optionsArray.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.pollForm.valid) {
      this.isSubmitting.set(true);
      
      const formValue = this.pollForm.value;
      const createPollRequest: CreatePollRequest = {
        name: formValue.name.trim(),
        question: formValue.question.trim(),
        owner: formValue.owner.trim(),
        options: formValue.options
          .filter((option: string) => option.trim().length > 0)
          .map((option: string): CreatePollOption => ({ value: option.trim() }))
      };

      this.http.post<CreatePollResponse>('/api/polls/create', createPollRequest).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.snackBar.open('Poll created successfully!', 'OK', { 
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/polls']);
        },
        error: (error) => {
          this.isSubmitting.set(false);
          console.error('Error creating poll:', error);
          this.snackBar.open(
            error.error?.message || 'Failed to create poll. Please try again.', 
            'OK', 
            { 
              duration: 5000,
              panelClass: ['error-snackbar']
            }
          );
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.pollForm);
      this.snackBar.open('Please fill in all required fields', 'OK', { duration: 3000 });
    }
  }

  onCancel(): void {
    this.router.navigate(['/polls']);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(arrayControl => {
          arrayControl.markAsTouched();
          if (arrayControl instanceof FormGroup) {
            this.markFormGroupTouched(arrayControl);
          }
        });
      }
    });
  }
}
