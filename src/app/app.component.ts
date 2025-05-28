import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { LoadingService } from './loading.service';
import { LoadingComponent } from './shared/loading/loading.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly loadingService = inject(LoadingService);
  private readonly router = inject(Router);

  readonly loading = this.loadingService.loading;

  private readonly events$ = this.router.events.pipe(takeUntilDestroyed());

  ngOnInit() {
    this.events$.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loadingService.increment({
          message: 'Loading application...',
        });
      }
      if (
        [NavigationEnd, NavigationCancel, NavigationError].some(
          (endEvent) => event instanceof endEvent,
        )
      ) {
        this.loadingService.decrement();
      }
    });
  }
}
