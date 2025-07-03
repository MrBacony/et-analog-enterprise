import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [MatToolbar, RouterLink],
  template: `<mat-toolbar class="top-0 flex-1 fixed shadow-level2">
  <span class="pl-16 text-4xl"><span class="text-primary">bit</span><span class="font-bold">Poll</span></span>
  <div class="flex-grow justify-end flex">
    <ul>
      <li class="inline-block mr-4">
        <a routerLink="/" class="cursor-pointer text-on-surface hover:text-primary">Home</a>
      </li>
      <li class="inline-block mr-4">
        <a routerLink="/polls" class="cursor-pointer text-on-surface hover:text-primary">Umfragen</a>
      </li>
      <li class="inline-block mr-4">
        <a routerLink="/polls/create" class="cursor-pointer text-on-surface hover:text-primary">Umfrage erstellen</a>
      </li>
    </ul>
  </div>
  
</mat-toolbar>`,
  
})
export class Header {}
