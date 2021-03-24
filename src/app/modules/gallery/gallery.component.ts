import { SavedImg } from './../../interfaces/savedImg.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { GalleryService } from './../services/gallery.service';
import { Component, OnInit } from "@angular/core";
import { take } from 'rxjs/operators';


@Component ({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {

  public allImages: SavedImg[] = [];
  public currentIndex: number = 0;
  // private currentImages: string = this.allImages[this.currentIndex].id;

  constructor(private galleryService: GalleryService, private fireAuth: AngularFireAuth) {}

  public ngOnInit(): void {
    this.fireAuth.user.subscribe(res => {
      if(res) {
        this.galleryService.getPublishedImages(res.uid)
        .pipe(
          take(1),
        )
        .subscribe(images => {
            this.allImages = images;
            // console.log(this.allImages[this.currentIndex].id);
        })
      }
    })
  }

  public removeImage (id: string): void {
    this.galleryService.remove(id).pipe(take(1)).subscribe(()=>{
      this.allImages = this.allImages.filter(post => post.id !== id)
    })
    this.nextImg();
  };

  public nextImg(): void {
    if(this.currentIndex === this.allImages.length-1) {
      this.currentIndex=0;
    } else {
      this.currentIndex++;
    }
  }

  public prevImg(): void {
    if(this.currentIndex === 0) {
      this.currentIndex= this.allImages.length-1;
    } else {
      this.currentIndex--;
    }
  }


}
