import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';
  showFiller = false;
  toggle = true;
  ontoggle(drawer){
    this.toggle = !this.toggle;
    drawer.toggle();
  }
}
