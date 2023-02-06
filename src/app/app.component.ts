import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  showNavbar: boolean = true;
  isLoading: boolean = false;

  constructor(private router: Router) {

    // Spinner for lazyload modules
    router.events.forEach((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading = false;
      }
    });
  }

  ngOnInit() {
    // Scroll to top after route change
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
