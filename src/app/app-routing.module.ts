import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'login',
        pathMatch:'full'
      },
      {
        path: 'login',
        loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'registration',
        loadChildren: () => import('./modules/registration/registration.module').then(m => m.RegistrationModule)
      },
      {
        path: 'white-board',
        loadChildren: () => import('./modules/white-board/white-board.module').then(m=>m.WhiteBoardModule)
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {};
