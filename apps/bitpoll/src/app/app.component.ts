import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header';
@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet],
  template: `
    <app-header />
    <div class="py-16">
      <router-outlet></router-outlet>
    </div>
 `,
})
export class AppComponent {}
