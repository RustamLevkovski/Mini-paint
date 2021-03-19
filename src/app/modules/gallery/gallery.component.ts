
import { WhiteBoardService } from 'src/app/modules/services/white-board.services';
import { Component, OnInit } from "@angular/core";
import { BoardShape } from "src/app/interfaces/coordinate.interface";

@Component ({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {

  private publisedImage: BoardShape[] = [];

  constructor(private whiteBoardService: WhiteBoardService) {}

  public ngOnInit(): void {

  }
}
