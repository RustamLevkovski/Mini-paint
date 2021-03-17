import { TemplatesComponent } from './components/templates/templates.component';
import { BrushSizeComponent } from './components/brush-size/brush-size.component';
// import { LoginComponent } from './../login/login.component';
import { PanelComponent } from './components/panel/panel.component';
import { DrawAreaComponent } from './components/draw-area/draw-area.component';
import { WhiteBoardComponent } from './white-board.component';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
// import { AuthentificationGuard } from '../services/authentification.guard';
// import { ColorPickerModule } from 'ngx-color-picker';

@NgModule ({
  declarations:[
    WhiteBoardComponent,
    DrawAreaComponent,
    PanelComponent,
    ColorPickerComponent,
    BrushSizeComponent,
    TemplatesComponent
     // ColorPickerModule


  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: WhiteBoardComponent, children: [
          // {path: '', redirectTo: 'login'},
          // {path: 'login', component: LoginComponent, canActivate: [AuthentificationGuard]}
        ]
      }
    ])
  ],
  providers: []
})

export class WhiteBoardModule {}
