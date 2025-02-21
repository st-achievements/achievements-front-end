import { DefaultTitleStrategy, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class TitleStrategy extends DefaultTitleStrategy {
  override buildTitle(snapshot: RouterStateSnapshot): string | undefined {
    return super.buildTitle(snapshot) || 'Achievements';
  }
}
