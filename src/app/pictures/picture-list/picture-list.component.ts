import { Component, OnInit } from '@angular/core';
import { IPicture } from '../shared/picture.model';
import { PictureService } from '../shared/picture.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.css']
})
export class PictureListComponent implements OnInit {
	windowWidth: number;
	isSmallScreen: boolean;
	pageTitle: string = "Picture List";
	pageNumber: number = 0;
	indexOfLastPicture: number;
	picturesLazyLoad: IPicture[];
	pictureList: IPicture[];
	errorMessage: string;
	selectedPicture: IPicture;

	constructor(
		private pictureService: PictureService,
		private router: Router)
	{
		this.windowWidth = window.innerWidth;
		this.isSmallScreen = this.windowWidth < 450;
	}

	ngOnInit() {
			this.pictureService
			.getPictures()
			.subscribe(
				pictures => {
					this.pictureList = pictures;
					this.picturesLazyLoad = pictures.slice(0, 48);
					this.indexOfLastPicture = 48;
				},
				error => this.errorMessage = <any>error
			);
	}

	onResize(event: any){
		this.windowWidth = event.target.innerWidth;
		this.isSmallScreen = this.windowWidth < 450;
	}

	onScroll(): void {
		let tmp = this.indexOfLastPicture + 48;
		while(this.indexOfLastPicture < this.pictureList.length && this.indexOfLastPicture < tmp){
			this.picturesLazyLoad.push(this.pictureList[this.indexOfLastPicture]);
			this.indexOfLastPicture++;
		}
	}

	navigateToPicture(picture: IPicture): void {
		this.router.navigate([`pictures/${picture.id}`])
	}

}
