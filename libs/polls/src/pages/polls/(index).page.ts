import { Component } from "@angular/core";
import { PollsList } from "../../lib/polls/components/polls-list/polls-list";

@Component({
  selector: "lib-polls-page-comp",
  standalone: true,
  imports: [PollsList],
  template: `
    <h1>Polls</h1>
    <lib-polls-list/>
  `,
})
export default class PollsPageComponent {}
