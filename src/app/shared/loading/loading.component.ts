import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-loading',
  imports: [SpinnerComponent],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'loader cdk-overlay-backdrop cdk-overlay-dark-backdrop cdk-overlay-backdrop-showing',
  },
})
export class LoadingComponent {}
