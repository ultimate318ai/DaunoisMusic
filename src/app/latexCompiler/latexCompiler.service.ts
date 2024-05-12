import { Injectable } from '@angular/core';
import { JsonMusicVariable, LatexCode } from '../services/latexMapping';

@Injectable({
  providedIn: 'root',
})
export class LatexCompilerService {
  constructor() {}

  compileToLatex(json: Record<JsonMusicVariable, LatexCode>) {}
}
