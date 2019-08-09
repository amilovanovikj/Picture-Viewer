import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IPicture } from '../shared/picture.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PictureService } from '../shared/picture.service';

@Component({
  selector: 'app-picture-details',
  templateUrl: './picture-details.component.html',
  styleUrls: ['./picture-details.component.css']
})
export class PictureDetailsComponent implements OnInit, OnChanges {

  pageTitle: string = 'Picture Details';
  currentPicture: IPicture;
  errorMessage: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pictureService: PictureService,
    private router: Router){}

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.pictureService
      .getPictures()
      .subscribe(pictures => {
          pictures.forEach(picture => {
            if(picture.id.toString() === id)
              this.currentPicture = picture
          })
        },
        error => this.errorMessage = <any>error
      );
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.pictureService
      .getPictures()
      .subscribe(pictures => {
          pictures.forEach(picture => {
            if(picture.id.toString() === id)
              this.currentPicture = picture
          })
        },
        error => this.errorMessage = <any>error
      );
  }

  navigateToPrevious(): void {
    this.currentPicture.id--;
    this.router.navigate([`pictures/${this.currentPicture.id}`])
  }

  navigateToNext(): void {
    this.currentPicture.id++;
    this.router.navigate([`pictures/${this.currentPicture.id}`])
  }
}
