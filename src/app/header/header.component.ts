import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	//create an event emitter
	@Output() navToggled = new EventEmitter();
	navOpen = false;

  constructor( private router: Router) { }

  ngOnInit() {
		this.router.events
		//Check if NavigationStart is running and if it is checks if navOpen (default to false)
			.filter(event => event instanceof NavigationStart && this.navOpen)
			.subscribe(event => this.toggleNav());
  }
  toggleNav() {
  	//inverts
		this.navOpen = !this.navOpen;
		//emits the event
		this.navToggled.emit(this.navOpen);

  }

}
