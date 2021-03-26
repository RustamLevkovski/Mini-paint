import { GalleryService } from './../services/gallery.service';
import { GalleryComponent } from './gallery.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule ({
  declarations: [
    GalleryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: GalleryComponent
      }
    ])
  ],
  providers: [
    GalleryService
  ],
})

export class GalleryModule {}
