import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  readonly #loading = signal(0);
  readonly loading = this.#loading.asReadonly();

  increment(quantity = 1) {
    this.#loading.set(this.#loading() + quantity);
  }

  decrement(quantity = 1) {
    this.#loading.set(Math.max(this.#loading() - quantity, 0));
  }
}
