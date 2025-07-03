import { Component, input } from "@angular/core";
@Component({
  selector: "lib-polls-detail",
  template: `
    <h1>Polls Detail Page - ID {{ pollsId() }}</h1>`,
})
export default class PollsDetailPageComponent {  
   pollsId = input<number>();
}
