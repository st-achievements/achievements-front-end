export interface LoadingArgs {
  quantity: number;
  message?: string;
}

export class Loading {
  constructor(loading: LoadingArgs) {
    this.isLoading = !!loading.quantity;
    this.message = loading.message;
  }

  readonly isLoading;
  readonly message;
}
