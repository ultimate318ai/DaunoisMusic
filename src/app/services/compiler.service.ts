import { Injectable } from '@angular/core';
import { LexerService } from './lexer.service';
import grammar from './grammar';
import { ParserService } from './parser.service';
import Token from './types';

@Injectable({
  providedIn: 'root',
})
export class CompilerService {
  constructor(private lexer: LexerService, private parser: ParserService) {
    this.lexer.loadGrammar(grammar);
  }

  processLexerCode(code: string) {
    this.lexer.loadData(code);
    return this.lexer.processAll();
  }

  processParserCode(tokenList: Token[]) {
    return this.parser.generateASTTree(tokenList);
  }

  getAstTreeAsString() {
    return this.parser.printASTTree();
  }
}
