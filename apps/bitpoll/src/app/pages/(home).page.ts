import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButton, 
    MatCardModule, 
    MatIcon,
    RouterLink
  ],
  template: `
    <main class="container mx-auto px-4 py-8 pt-16 bg-surface text-on-surface">
      <!-- Hero Section -->
      <section class="flex flex-col items-center justify-center text-center py-12">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          <span class="text-primary">BitPoll</span> - Einfache Umfragen für alle
        </h1>
        <p class="text-xl max-w-3xl mb-8 text-on-surface">
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

      </section>

      <!-- Features Section -->
      <section class="py-12">
        <h2 class="text-3xl font-bold text-center mb-12 text-on-surface">Warum BitPoll?</h2>
        <div class="flex flex-wrap gap-4 justify-center">
          <div class="flex-grow basis-64 max-w-sm">
            <mat-card appearance="outlined" class="text-center w-full h-56 shadow-level1 bg-surface">
              <mat-card-header class="justify-center">
                <div class="bg-primary-container size-16 rounded-full flex items-center justify-center mx-auto mb-2">
                  <mat-icon class="text-on-primary-container text-3xl">schedule</mat-icon>
                </div>
              </mat-card-header>
              <mat-card-title class="text-xl font-semibold mb-2 text-primary">Schnell & Einfach</mat-card-title>
              <mat-card-content>
                <p class="text-on-surface">Erstellen Sie Umfragen in wenigen Minuten und teilen Sie sie sofort.</p>
              </mat-card-content>
            </mat-card>
          </div>
          
          <div class="flex-grow basis-64 max-w-sm">
            <mat-card appearance="outlined" class="text-center w-full h-56 shadow-level1 bg-surface">
              <mat-card-header class="justify-center">
                <div class="bg-primary-container size-16 rounded-full flex items-center justify-center mx-auto mb-2">
                  <mat-icon class="text-on-primary-container text-3xl">security</mat-icon>
                </div>
              </mat-card-header>
              <mat-card-title class="text-xl font-semibold mb-2 text-primary">Sicher & Privat</mat-card-title>
              <mat-card-content>
                <p class="text-on-surface">Ihre Daten sind sicher und werden vertraulich behandelt.</p>
              </mat-card-content>
            </mat-card>
          </div>
          
          <div class="flex-grow basis-64 max-w-sm">
            <mat-card appearance="outlined" class="text-center w-full h-56 shadow-level1 bg-surface">
              <mat-card-header class="justify-center">
                <div class="bg-primary-container size-16 rounded-full flex items-center justify-center mx-auto mb-2">
                  <mat-icon class="text-on-primary-container text-3xl">bar_chart</mat-icon>
                </div>
              </mat-card-header>
              <mat-card-title class="text-xl font-semibold mb-2 text-primary">Echtzeit-Ergebnisse</mat-card-title>
              <mat-card-content>
                <p class="text-on-surface">Sehen Sie die Umfrageergebnisse in Echtzeit und exportieren Sie sie nach Bedarf.</p>
              </mat-card-content>
            </mat-card>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <mat-card appearance="outlined" class="my-12 py-6 shadow-level2 bg-surface-container">
        <mat-card-content class="text-center">
          <h2 class="text-2xl font-bold mb-4 text-on-surface">Bereit für Ihre erste Umfrage?</h2>
          <p class="mb-6 text-on-surface">Starten Sie noch heute und sammeln Sie wertvolles Feedback.</p>
          <a [routerLink]="['/polls/create']" mat-raised-button color="primary">
            <mat-icon>rocket_launch</mat-icon> Jetzt loslegen
          </a>
        </mat-card-content>
      </mat-card>
    </main>
  `,
})
export default class HomeComponent {}
