import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PictureListComponent } from '../pictures/picture-list/picture-list.component';
import { PictureDetailsComponent } from './picture-details/picture-details.component';

export const routes: Routes = [
    { path: 'pictures', component: PictureListComponent, pathMatch: "full" },
    { path: 'pictures/:id', component: PictureDetailsComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PictureRoutingModule { }
