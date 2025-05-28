import { inject, Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  private readonly breakpointObserver = inject(BreakpointObserver);

  private readonly isMobile$ = this.breakpointObserver
    .observe([Breakpoints.HandsetPortrait])
    .pipe(map((event) => event.matches));

  readonly isMobile = toSignal(this.isMobile$, { initialValue: false });
}
