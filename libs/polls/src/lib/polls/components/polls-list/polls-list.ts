import { Component } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Poll, PollsListSchema } from '../../models/polls';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-polls-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule,
  ],
  template: `
    <div class="p-6 max-w-7xl mx-auto">
      @if(pollsResource.hasValue()) {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          @for (poll of pollsResource.value(); track poll.id) {
            <mat-card class="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <mat-card-header>
                <mat-card-title>{{ poll.name }}</mat-card-title>
              </mat-card-header>
              
              <mat-card-content>
                <p class="text-base leading-relaxed my-4 text-gray-800">{{ poll.question }}</p>
                <p class="flex items-center text-sm text-gray-600 my-2">
                  <mat-icon class="w-4 h-4 text-base mr-2">person</mat-icon>
                  Owner: {{ poll.owner }}
                </p>
                <p class="flex items-center text-sm text-gray-600 my-2">
                  <mat-icon class="w-4 h-4 text-base mr-2">ballot</mat-icon>
                  {{ poll.options.length }} options
                </p>
              </mat-card-content>
              
              <mat-card-actions class="p-4">
                <div class="flex w-full justify-end space-x-2 md:flex-col md:space-x-0 md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
                  <button 
                    mat-raised-button 
                    color="primary"
                    class="md:w-full lg:w-auto"
                    [routerLink]="['/polls', poll.id, 'vote']">
                    <mat-icon>how_to_vote</mat-icon>
                    Vote Now
                  </button>
                </div>
              </mat-card-actions>
            </mat-card>
          }
        </div>
      } @else if (pollsResource.error()) {
        <mat-card class="max-w-lg mx-auto mt-12">
          <mat-card-content>
            <div class="text-center p-6">
              <mat-icon class="w-12 h-12 text-5xl text-red-500 mb-4">error</mat-icon>
              <h3 class="text-lg font-medium mb-2">Error Loading Polls</h3>
              <p class="text-gray-600 mb-4">{{ pollsResource.error()?.message }}</p>
              <button mat-raised-button color="primary" (click)="retryLoading()">
                <mat-icon>refresh</mat-icon>
                Retry
              </button>
            </div>
          </mat-card-content>
        </mat-card>
      } @else {
        <div class="flex flex-col items-center justify-center p-12">
          <mat-spinner diameter="50"></mat-spinner>
          <p class="mt-4 text-base text-gray-600">Loading polls...</p>
        </div>
      }
    </div>
  `,
})
export class PollsList {
  pollsResource = httpResource(
    () => ({
      url: `/api/polls`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }),
    { parse: PollsListSchema.parse }
  );

  retryLoading() {
    // Force a refresh of the resource by creating a new instance
    this.pollsResource.reload();
  }
}
