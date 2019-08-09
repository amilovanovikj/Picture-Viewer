import { NgModule } from '@angular/core';
import { PictureDetailsComponent } from './picture-details/picture-details.component';
import { PictureListComponent } from './picture-list/picture-list.component';
import { PictureRoutingModule } from './picture-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        PictureDetailsComponent,
        PictureListComponent
    ],
    imports: [
        CommonModule,
        PictureRoutingModule,
    ],
    exports:[
        
    ]
})
export class PictureModule { }