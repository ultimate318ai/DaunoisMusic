import { TestBed } from '@angular/core/testing';

import { LatexCompilerService } from './latexCompiler.service';

describe('LatexCompiler', () => {
  let service: LatexCompilerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LatexCompilerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
