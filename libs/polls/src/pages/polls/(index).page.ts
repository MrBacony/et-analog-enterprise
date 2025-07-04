import { Component } from "@angular/core";
import { PollsList } from "../../lib/polls/components/polls-list/polls-list";
import { RouteMeta } from '@analogjs/router';
import { authGuard } from "@analog-tools/auth/angular";
export const routeMeta: RouteMeta = {
  title: "Polls",
  canActivate: [authGuard]
}

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
