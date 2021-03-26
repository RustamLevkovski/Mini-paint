import { AuthentificationService } from './authentification.service';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthentificationGuard implements CanActivate {

  constructor(
    private auth: AuthentificationService,
    private router: Router
    ) {}

  public canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['./login'], {
        queryParams: {
          loginAgain: true
        }
      });
    }
  }
}
