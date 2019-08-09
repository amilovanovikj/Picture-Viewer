import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Picture Viewer';

  constructor(private router: Router){}

  navigateHome(): void {
    this.router.navigate(['/welcome']);
  }

  navigatePictureList(): void {
    this.router.navigate(['/pictures']);
  }
}
