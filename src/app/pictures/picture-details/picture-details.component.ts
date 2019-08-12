import { Component, OnInit } from '@angular/core';
import { IPicture } from '../shared/picture.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PictureService } from '../shared/picture.service';

@Component({
  selector: 'app-picture-details',
  templateUrl: './picture-details.component.html',
  styleUrls: ['./picture-details.component.css']
})
export class PictureDetailsComponent implements OnInit {

  pageTitle: string = 'Picture Details';
  highestId: number;
  lowestId: number;
  currentPicture: IPicture;
  previousPicture: IPicture;
  nextPicture: IPicture;
  numberOfPicturesInDatabase: number;
  errorMessage: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pictureService: PictureService,
    private router: Router){}

  ngOnInit() {
    let id = +this.activatedRoute.snapshot.paramMap.get('id');
  //   this.getMaxMin();
    this.getPictureFromId(id);
  }
  // getMaxMin() : void {
  //   let minId = Number.MAX_SAFE_INTEGER;
  //   let maxId = Number.MIN_SAFE_INTEGER;
  //   this.pictureService
  //     .getPictures()
  //     .subscribe(pictures => {
  //         pictures.forEach(picture => {
  //           if (minId > picture.id)
  //             minId = picture.id;
  //           if (maxId < picture.id)
  //             maxId = picture.id;
  //         })
  //         this.highestId = maxId;
  //         this.lowestId = minId;
  //       },
  //       error => this.errorMessage = <any>error
  //     );
  // }

  getPictureFromId(id: number) : void {
    let prevId = id - 1 <= 0 ? 5000 : id - 1; // bug
    let nextId = id + 1 >= 5001 ? 1 : id + 1; // bug
    this.pictureService
      .getPictures()
      .subscribe(pictures => {
          pictures.forEach(picture => {
            if (picture.id == prevId)
              this.previousPicture = picture;
            if (picture.id == id)
              this.currentPicture = picture;
            if (picture.id == nextId)
              this.nextPicture = picture;
          })
        },
        error => this.errorMessage = <any>error
      );
  }

  navigateToPrevious(): void {
    let id = this.previousPicture.id;
    this.getPictureFromId(id)
    this.router.navigate([`pictures/${id}`])
  }

  navigateToNext(): void {
    let id = this.nextPicture.id;
    this.getPictureFromId(id)
    this.router.navigate([`pictures/${id}`])
  }

  navigateBack(): void {
    this.router.navigate(['pictures/'])
  }
}
