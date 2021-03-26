import { User } from '../../interfaces/user.interface';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()

export class AuthentificationService {
  constructor(private afAuth: AngularFireAuth) {}

  get token(): string {
    return localStorage.getItem('fb-token');
  }

  public login(user: User): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password);
  }

  public logout(): void {
    this.afAuth.signOut().then(() => {
      this.setToken(null);
      localStorage.clear();
    });
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public signUp(user: User): void {
    this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
    .then((userCredential) => {
      this.afAuth.currentUser.then(result => result.sendEmailVerification());
     });
  }

  public setToken(token: string): void {
    if (token) {
      localStorage.setItem('fb-token', token);
    } else {
      localStorage.clear();
    }
  }

  public getUserId(): void {
    this.afAuth.currentUser
    .then(res => localStorage.setItem('userID', res.uid))
    .catch(res => res === null);
  }
 }
