import { Component } from "@angular/core";

@Component({
  selector: "lib-polls-page-comp",
  standalone: true,
  template: `
    <h1>Polls</h1>
    <p>Hier entsteht die Polls-Feature Library.</p>
    <p>Aktuell ist sie noch leer, aber bald wird sie mit Leben gefüllt!</p>
    link to <a href="/polls/1">Polls Detail Page</a>
  `,
})
export default class PollsPageComponent {}