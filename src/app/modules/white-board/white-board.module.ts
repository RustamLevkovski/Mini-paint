import { WhiteBoardService } from './../services/white-board.services';
import { TemplatesComponent } from './components/templates/templates.component';
import { BrushSizeComponent } from './components/brush-size/brush-size.component';
import { PanelComponent } from './components/panel/panel.component';
import { DrawAreaComponent } from './components/draw-area/draw-area.component';
import { WhiteBoardComponent } from './white-board.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule ({
  declarations: [
    WhiteBoardComponent,
    DrawAreaComponent,
    PanelComponent,
    ColorPickerComponent,
    BrushSizeComponent,
    TemplatesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '', component: WhiteBoardComponent, children: [
        ]
      }
    ])
  ],
  providers: [
    WhiteBoardService
  ]
})

export class WhiteBoardModule {}
