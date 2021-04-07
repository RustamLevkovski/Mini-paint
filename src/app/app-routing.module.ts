import { AuthentificationGuard } from './services/authentification.guard';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./modules/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'registration',
        loadChildren: () =>
          import('./modules/registration/registration.module').then(
            (m) => m.RegistrationModule
          ),
      },
      {
        path: 'white-board',
        loadChildren: () =>
          import('./modules/white-board/white-board.module').then(
            (m) => m.WhiteBoardModule
          ),
        canActivate: [AuthentificationGuard],
      },
      {
        path: 'gallery',
        loadChildren: () =>
          import('./modules/gallery/gallery.module').then(
            (m) => m.GalleryModule
          ),
        canActivate: [AuthentificationGuard],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
