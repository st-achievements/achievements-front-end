import { computed, Injectable, signal } from '@angular/core';
import { Loading, LoadingArgs } from './model/arch/loading';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  readonly #loading = signal<LoadingArgs>({ quantity: 0 });
  readonly loading = computed(() => new Loading(this.#loading()));

  increment({ quantity = 1, message }: Partial<LoadingArgs> = { quantity: 1 }) {
    this.#loading.set({
      message,
      quantity: this.#loading().quantity + quantity,
    });
  }

  decrement(quantity = 1) {
    this.#loading.set({
      quantity: Math.max(this.#loading().quantity - quantity, 0),
    });
  }
}
