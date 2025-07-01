import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'bitpoll-home',

  imports: [AnalogWelcomeComponent],
  template: ` <bitpoll-analog-welcome /> `,
})
export default class HomeComponent {}
