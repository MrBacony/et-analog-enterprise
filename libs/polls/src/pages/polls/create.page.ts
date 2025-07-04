import { Component } from '@angular/core';
import { CreatePoll } from "../../lib/polls/components/create-poll/create-poll";
@Component({
  selector: 'lib-polls-create-page',
  imports: [CreatePoll],
  template: `<lib-create-poll/> `,
})
export default class PollsCreatePageCompoent {}
