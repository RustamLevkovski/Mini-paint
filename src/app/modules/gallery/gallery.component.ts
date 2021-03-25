import { SavedImg } from './../../interfaces/savedImg.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { GalleryService } from './../services/gallery.service';
import { Component, DoCheck, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';


@Component ({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit, DoCheck {

  public allImages: SavedImg[] = [];
  public currentIndex = 0;
  public array: SavedImg[] = [];
  public isShow: boolean;

  constructor(private galleryService: GalleryService, private fireAuth: AngularFireAuth) {}

  public ngOnInit(): void {


    this.fireAuth.user.subscribe(res => {
      if (res) {
        this.galleryService.getPublishedImages(res.uid)
        .pipe(
          take(1),
        )
        .subscribe(images => {
            this.allImages = images;
            this.condition();
         });
      }
    });
  }

  public ngDoCheck(): void {
    this.condition();
  }

  public removeImage(id: string): void {
    id = this.allImages[this.currentIndex].id;
    this.galleryService.remove(id).pipe(take(1)).subscribe(() => {
      this.allImages = this.allImages.filter(post => post.id !== id);
    });
    this.nextImg();
  }

  public nextImg(): void {
    if (this.currentIndex === this.allImages.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
  }

  public prevImg(): void {
    if (this.currentIndex === 0) {
      this.currentIndex = this.allImages.length - 1;
    } else {
      this.currentIndex--;
    }
   }

  public condition(): void {
         if (this.allImages.length === this.array.length) {
       this.isShow = true;
       this.allImages = this.array;
     }
     else {
       this.isShow = false;
     }


  }


}
