import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IPicture } from './picture.model';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class PictureService {
    pictureUrl: string = "http://jsonplaceholder.typicode.com/photos";
    constructor(private http: HttpClient){}
    getPictures() : Observable<IPicture[]> {
        return this.http
            .get<IPicture[]>(this.pictureUrl)
            .pipe(
                tap(data => console.log("All: " + JSON.stringify(data))),
			    catchError(this.handleError) 
            )
    }

    handleError(err: HttpErrorResponse){
        let errorMessage = '';
		if(err.error instanceof ErrorEvent){
			errorMessage = `An error occured ${err.error.message}`;
		}
		else{
			errorMessage = `Server returned code ${err.status}, error message is ${err.error.message}`;
		}
		console.error(errorMessage);
		return throwError(errorMessage);
	}
    
}