import { Component, OnInit } from '@angular/core';

declare var $: any;
declare function init($);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'Taller Musso';

  ngOnInit(): void {

    // SLIDER
    init($);

  }
}
