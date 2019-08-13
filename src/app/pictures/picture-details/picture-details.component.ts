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
    this.getPictureFromId(id);
  }

  getPictureFromId(id: number) : void {
    this.pictureService
      .getPictures()
      .subscribe(pictures => {
          this.setHighestLowestId(pictures);
          this.getCurrentPreviousNextPicture(pictures, id);
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

  getCurrentPreviousNextPicture(pictures: IPicture[], id: number): void {
    let prevId = this.findPreviousId(id);
    let nextId = this.findNextId(id);
    pictures.forEach(picture => {
      if (picture.id == prevId)
        this.previousPicture = picture;
      if (picture.id == id)
        this.currentPicture = picture;
      if (picture.id == nextId)
        this.nextPicture = picture;
    })
  }

  findPreviousId(id: number): number {
    if(id - 1 < this.lowestId)
      return this.highestId;
    return id - 1;
  }

  findNextId(id : number): number {
    if(id + 1 > this.highestId)
      return this.lowestId;
    return id + 1;
  }

  setHighestLowestId(pictures: IPicture[]): void {
    this.highestId = pictures.length;
    this.lowestId = 1;
  }
}
