import { Injectable } from '@angular/core';
import Token from './types';
import { GrammarToken } from './grammar';

@Injectable({
  providedIn: 'root',
})
export class LexerService {
  private index: number = 0;
  private expr: string = '';
  private regex?: RegExp;
  public tokens: Token[] = [];
  public column: number = 1;
  public line: number = 1;
  public data: string = '';
  public grammar: GrammarToken[] = [];

  constructor() {}

  private getRegex() {
    if (!this.regex) {
      this.regex = new RegExp(this.expr, 'gmu');
      console.log(this.regex);
    }
    this.regex.lastIndex = this.index;
    return this.regex;
  }
  public loadDefinition(def: GrammarToken) {
    if (this.expr.length > 0) this.expr += '|';
    this.expr += `(${def.match})`;
    this.regex = undefined;
    this.grammar.push(def);

    return this;
  }
  public loadGrammar(grammar: GrammarToken[]) {
    grammar.forEach((def) => this.loadDefinition(def));
    return this;
  }
  public loadData(data: string) {
    this.data += data;
    return this;
  }
  public next(): Token | undefined {
    const regex = this.getRegex();
    const match = regex.exec(this.data);
    if (match) {
      const length = match[0].length;
      const token = this.grammar[match.indexOf(match[0], 1) - 1];
      const id = token.id;
      this.index += length;
      this.tokens.push(
        new Token(
          {
            column: this.column,
            line: this.line,
            value: match[0],
            length,
            id,
          },
          this
        )
      );
      if (id === 'newline') {
        this.column = 1;
        this.line++;
      } else if (id === 'whitespace') {
        this.column++;
      } else {
        this.column += length;
      }

      return this.tokens[this.tokens.length - 1];
    }
    return undefined;
  }
  public processAll() {
    for (let i = 0; i < Infinity; i++) {
      const token = this.next();
      if (!token) break;
    }

    return this.tokens;
  }
  public update() {
    this.tokens = this.tokens
      .filter((token) => {
        return token.value && token.value !== '';
      })
      .sort((a, b) => {
        const line = a.line - b.line;
        const column = a.column - b.column;
        return line === 0 ? column : line;
      })
      .map((token, index, tokens) => {
        if (index > 0) {
          const previous = tokens[index - 1];
          if (previous.id === 'newline') {
            return token.moveTo(previous.line + 1, 1, false);
          }
          return token.moveTo(
            previous.line,
            previous.column + previous.length,
            false
          );
        } else {
          return token.moveTo(1, 1, false);
        }
      });

    return this;
  }
  public empty() {
    this.data = '';
    this.line = 1;
    this.column = 1;
    this.index = 0;
    this.tokens = [];

    return this;
  }
}
