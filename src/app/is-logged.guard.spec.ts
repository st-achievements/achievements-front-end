import { IsLoggedGuard } from './is-logged.guard';
import { TestBed } from '@angular/core/testing';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { CanActivateFn } from '@angular/router';

describe('IsLoggedGuard', () => {
  let guard: CanActivateFn;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()],
    });
    guard = IsLoggedGuard();
  });

  it('should create function', () => {
    expect(guard).toBeDefined();
  });
});
