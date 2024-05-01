import { Injectable } from '@angular/core';
import Token from './types';
import { SheetMusic } from './parserClasses/SheetMusic';

@Injectable({
  providedIn: 'root',
})
export class ParserService {
  private AST = {
    type: 'Program',
    program: Array<SheetMusic>(),
  };

  constructor() {}

  get AstTree() {
    return this.AST;
  }

  generateASTTree(tokenList: Token[]): void {
    this.AST = {
      type: 'Program',
      program: Array<SheetMusic>(),
    };
    let current_token;
    while (tokenList.length > 0) {
      current_token = tokenList.shift();
    }
    if (!current_token) return;

    if (current_token.id === 'MusicSheet') {
      this.AST.program.push(new SheetMusic(current_token.value));
    }
  }
  printASTTree(): string {
    const treeContent = this.AST.program
      .map((program) => program.toString())
      .reduce((accumulated, current) => accumulated.concat(current), '');
    return `(Program) :  {\n\t${treeContent}\t\n}\n`;
  }

  parseASTTree(): void {
    this.AST.program.forEach((program) => program.parse());
  }
}
