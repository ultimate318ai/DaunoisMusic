import { Injectable } from '@angular/core';
import { LexerService } from './lexer.service';
import grammar from './grammar';

@Injectable({
  providedIn: 'root',
})
export class CompilerService {
  constructor(private lexer: LexerService) {
    this.lexer.loadGrammar(grammar);
  }

  processLexerCode(code: string) {
    console.log('je suis le code');
    console.log(code);
    this.lexer.loadData(code);
    return this.lexer.processAll();
  }
}
