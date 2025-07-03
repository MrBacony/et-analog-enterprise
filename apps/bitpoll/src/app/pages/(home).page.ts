import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatCardModule, 
    MatIconModule,
    MatDividerModule,
    MatGridListModule,
    RouterModule
  ],
  styles: `
    /* Colors from Material Design Theme */
    .mat-theme-bg-primary-container {
      background-color: var(--mat-sys-primary-container);
    }
    
    .mat-theme-color-on-primary-container {
      color: var(--mat-sys-on-primary-container);
    }
    
    .mat-theme-color-primary {
      color: var(--mat-sys-primary);
    }
    
    .mat-theme-bg-surface {
      background-color: var(--mat-sys-surface);
    }
    
    .mat-theme-color-on-surface {
      color: var(--mat-sys-on-surface);
    }
    
    .mat-theme-bg-surface-container {
      background-color: var(--mat-sys-surface-container);
    }
    
    .mat-theme-bg-secondary-container {
      background-color: var(--mat-sys-secondary-container);
    }
    
    .mat-theme-color-on-secondary-container {
      color: var(--mat-sys-on-secondary-container);
    }
    
    /* Component specific styles */
    .feature-icon-container {
      width: 4rem;
      height: 4rem;
    }
    
    /* Apply Material Design elevation */
    .mat-elevation-z1 {
      box-shadow: var(--mat-sys-level1);
    }
    
    .mat-elevation-z2 {
      box-shadow: var(--mat-sys-level2);
    }
  `,
  template: `
    <main class="container mx-auto px-4 py-8" style="background-color: var(--mat-sys-surface); color: var(--mat-sys-on-surface);">
      <!-- Hero Section -->
      <section class="flex flex-col items-center justify-center text-center py-12">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          <span class="mat-theme-color-primary">BitPoll</span> - Einfache Umfragen für alle
        </h1>
        <p class="text-xl max-w-3xl mb-8 mat-theme-color-on-surface">
          Erstellen Sie schnell und einfach Umfragen, teilen Sie diese mit Ihren Kollegen und treffen Sie fundierte Entscheidungen.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 mb-12">
          <a [routerLink]="['/polls/create']" mat-raised-button color="primary">
            <mat-icon>add</mat-icon> Umfrage erstellen
          </a>
          <a [routerLink]="['/polls']" mat-stroked-button>
            <mat-icon>visibility</mat-icon> Beispiele ansehen
          </a>
        </div>
        <img 
          src="/assets/poll-illustration.svg" 
          alt="BitPoll Illustration" 
          class="max-w-md w-full h-auto mat-elevation-z1"
        />
      </section>

      <!-- Features Section -->
      <section class="py-12">
        <h2 class="text-3xl font-bold text-center mb-12 mat-theme-color-on-surface">Warum BitPoll?</h2>
        <mat-grid-list [cols]="columns" rowHeight="1:1" gutterSize="16px">
          <mat-grid-tile>
            <mat-card appearance="outlined" class="text-center w-full h-full mat-elevation-z1 mat-theme-bg-surface">
              <mat-card-header class="justify-center">
                <div class="mat-theme-bg-primary-container feature-icon-container rounded-full flex items-center justify-center mx-auto mb-2">
                  <mat-icon class="mat-theme-color-on-primary-container text-3xl">schedule</mat-icon>
                </div>
              </mat-card-header>
              <mat-card-title class="text-xl font-semibold mb-2 mat-theme-color-primary">Schnell & Einfach</mat-card-title>
              <mat-card-content>
                <p class="mat-theme-color-on-surface">Erstellen Sie Umfragen in wenigen Minuten und teilen Sie sie sofort.</p>
              </mat-card-content>
            </mat-card>
          </mat-grid-tile>
          
          <mat-grid-tile>
            <mat-card appearance="outlined" class="text-center w-full h-full mat-elevation-z1 mat-theme-bg-surface">
              <mat-card-header class="justify-center">
                <div class="mat-theme-bg-primary-container feature-icon-container rounded-full flex items-center justify-center mx-auto mb-2">
                  <mat-icon class="mat-theme-color-on-primary-container text-3xl">security</mat-icon>
                </div>
              </mat-card-header>
              <mat-card-title class="text-xl font-semibold mb-2 mat-theme-color-primary">Sicher & Privat</mat-card-title>
              <mat-card-content>
                <p class="mat-theme-color-on-surface">Ihre Daten sind sicher und werden vertraulich behandelt.</p>
              </mat-card-content>
            </mat-card>
          </mat-grid-tile>
          
          <mat-grid-tile>
            <mat-card appearance="outlined" class="text-center w-full h-full mat-elevation-z1 mat-theme-bg-surface">
              <mat-card-header class="justify-center">
                <div class="mat-theme-bg-primary-container feature-icon-container rounded-full flex items-center justify-center mx-auto mb-2">
                  <mat-icon class="mat-theme-color-on-primary-container text-3xl">bar_chart</mat-icon>
                </div>
              </mat-card-header>
              <mat-card-title class="text-xl font-semibold mb-2 mat-theme-color-primary">Echtzeit-Ergebnisse</mat-card-title>
              <mat-card-content>
                <p class="mat-theme-color-on-surface">Sehen Sie die Umfrageergebnisse in Echtzeit und exportieren Sie sie nach Bedarf.</p>
              </mat-card-content>
            </mat-card>
          </mat-grid-tile>
        </mat-grid-list>
      </section>

      <!-- CTA Section -->
      <mat-card appearance="outlined" class="my-12 py-6 mat-elevation-z2 mat-theme-bg-surface-container">
        <mat-card-content class="text-center">
          <h2 class="text-2xl font-bold mb-4 mat-theme-color-on-surface">Bereit für Ihre erste Umfrage?</h2>
          <p class="mb-6 mat-theme-color-on-surface">Starten Sie noch heute und sammeln Sie wertvolles Feedback.</p>
          <a [routerLink]="['/polls/create']" mat-raised-button color="primary">
            <mat-icon>rocket_launch</mat-icon> Jetzt loslegen
          </a>
        </mat-card-content>
      </mat-card>
    </main>
  `,
})
export default class HomeComponent {
  // Responsive columns for the grid list
  columns = 3;
  
  constructor() {
    // Update columns based on window width for responsiveness
    this.setGridColumns(window.innerWidth);
    
    window.addEventListener('resize', () => {
      this.setGridColumns(window.innerWidth);
    });
  }
  
  // Set columns based on screen width
  private setGridColumns(width: number): void {
    if (width < 768) {
      this.columns = 1;
    } else if (width < 1024) {
      this.columns = 2;
    } else {
      this.columns = 3;
    }
  }
}
