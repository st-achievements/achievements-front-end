import { HttpContextToken } from '@angular/common/http';

export const LoadingMessageContextToken = new HttpContextToken<
  string | undefined
>(() => undefined);
