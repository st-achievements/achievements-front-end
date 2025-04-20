import { computed, inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User as FirebaseUser,
} from '@angular/fire/auth';
import { filter, Observable, of, Subject, switchMap, take, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpContext } from '@angular/common/http';
import { User } from './model/user';
import { assert } from './error/assert';
import { toObservable } from '@angular/core/rxjs-interop';
import { LoadingMessageContextToken } from './loading-message-context-token';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor() {
    this.firebaseAuth.onAuthStateChanged((user) => {
      this.#userFirebase.set(user);
      const getUser$: Observable<User | null> = user
        ? this.httpClient
            .get<User>(
              `${environment.UserManagementApi}/v1/users/external/${user.uid}`,
              {
                context: new HttpContext().set(
                  LoadingMessageContextToken,
                  'Loading user...',
                ),
              },
            )
            .pipe(
              tap((user) => {
                this.#user.set(user);
              }),
            )
        : of(null);
      getUser$.subscribe(() => {
        this.firstAuthSignal.next();
      });
    });
  }

  private readonly firebaseAuth = inject(Auth);
  private readonly router = inject(Router);
  private readonly httpClient = inject(HttpClient);

  readonly firstAuthSignal = new Subject<void>();

  readonly #userFirebase = signal<FirebaseUser | null>(null);
  readonly #user = signal<User | null>(null);
  readonly #user$ = toObservable(this.#user);

  readonly userFirebase = this.#userFirebase.asReadonly();

  readonly user = computed(() => {
    const user = this.#user();
    assert(user, 'To use the user variable, you need to be logged in.');
    return user;
  });

  async loginWithGoogle() {
    await signInWithPopup(this.firebaseAuth, new GoogleAuthProvider());
    this.#user$
      .pipe(
        filter((user) => !!user),
        take(1),
        switchMap(async () => {
          await this.router.navigate([
            '/achievements',
            new Date().getFullYear(),
          ]);
        }),
      )
      .subscribe();
  }

  async logout() {
    await signOut(this.firebaseAuth);
    await this.router.navigate(['/login']);
  }
}
