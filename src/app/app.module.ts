import { AppRoutingModule } from './app-routing.module';
import { WhiteBoardModule } from './modules/white-board/white-board.module';
import { RegistrationModule } from './modules/registration/registration.module';
import { LoginModule } from './modules/login/login.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    LoginModule,
    RegistrationModule,
    WhiteBoardModule,
    GalleryModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
