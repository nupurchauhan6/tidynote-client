import { TestBed } from '@angular/core/testing';

import { AppNoteService } from './app-note.service';

describe('AppNoteService', () => {
  let service: AppNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
