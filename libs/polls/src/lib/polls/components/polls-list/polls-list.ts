import { Component } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Poll, PollsListSchema } from '../../models/polls';
@Component({
  selector: 'lib-polls-list',
  template: `
    @if(pollsResource.hasValue()) {
    <ul>
      @for (poll of pollsResource.value(); track poll.id) {
      <li>{{ poll.name }} - {{ poll.question }}</li>
      }
    </ul>
    } @else if (pollsResource.error()) {
    <p>Error loading polls: {{ pollsResource.error()?.message }}</p>
    } @else {
    <p>Loading polls...</p>
    }
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
}
