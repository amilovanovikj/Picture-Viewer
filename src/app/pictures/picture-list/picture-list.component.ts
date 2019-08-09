import { Component, OnInit, } from '@angular/core';
import { IPicture } from '../shared/picture.model';
import { PictureService } from '../shared/picture.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.css']
})
export class PictureListComponent implements OnInit {
	windowWidth: number;
	isScreenWidthGreaterThan400: boolean;
	pageTitle: string = "Picture List";
	pictures$: Observable<IPicture[]>;
	errorMessage: string;
	selectedPicture: IPicture;

	constructor(
		private pictureService: PictureService,
		private router: Router)
	{
		this.windowWidth = window.innerWidth;
		this.isScreenWidthGreaterThan400 = this.windowWidth > 400;
	}

	ngOnInit() {
		this.pictures$ = this.pictureService.getPictures()
	}

	onResize(event: any){
		this.windowWidth = event.target.innerWidth;
		this.isScreenWidthGreaterThan400 = this.windowWidth > 400;
	}

	navigateToPicture(picture: IPicture): void {
		this.router.navigate([`pictures/${picture.id}`])
	}
}
