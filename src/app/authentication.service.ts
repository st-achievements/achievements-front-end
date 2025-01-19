import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  signOut,
} from '@angular/fire/auth';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor() {
    this.firebaseAuth.onAuthStateChanged((user) => {
      this.#user.set(user);
      this.firstAuthSignal.next();
    });
  }

  private readonly firebaseAuth = inject(Auth);
  private readonly router = inject(Router);

  readonly firstAuthSignal = new Subject<void>();

  readonly #user = signal<User | null>(null);

  readonly user = this.#user.asReadonly();

  async loginWithGoogle() {
    await signInWithPopup(this.firebaseAuth, new GoogleAuthProvider());
    await this.router.navigate(['/achievements']);
  }

  async logout() {
    await signOut(this.firebaseAuth);
    await this.router.navigate(['/login']);
  }
}
