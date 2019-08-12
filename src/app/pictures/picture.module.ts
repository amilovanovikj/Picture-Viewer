import { NgModule } from '@angular/core';
import { PictureDetailsComponent } from './picture-details/picture-details.component';
import { PictureListComponent } from './picture-list/picture-list.component';
import { PictureRoutingModule } from './picture-routing.module';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
    declarations: [
        PictureDetailsComponent,
        PictureListComponent
    ],
    imports: [
        CommonModule,
        PictureRoutingModule,
        InfiniteScrollModule
    ],
    exports:[
        
    ]
})
export class PictureModule { }