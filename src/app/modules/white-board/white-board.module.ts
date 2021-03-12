import { ToolsComponent } from './components/tools/tools.component';
import { PanelComponent } from './components/panel/panel.component';
import { DrawAreaComponent } from './components/draw-area/draw-area.component';
import { WhiteBoardComponent } from './white-board.component';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule ({
  declarations:[
    WhiteBoardComponent,
    DrawAreaComponent,
    PanelComponent,
    ToolsComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild([])
  ],
  providers: []
})

export class WhiteBoardModule {}
