import { LanguageKeyword, MiscKeyword } from './grammar';
import { LexerService } from './lexer.service';

interface TokenData {
  value: string;
  id: LanguageKeyword | MiscKeyword;
  line: number;
  column: number;
  length: number;
}
export default class Token implements TokenData {
  public value: string;
  public id: LanguageKeyword | MiscKeyword;
  public line: number;
  public column: number;
  public length: number;
  private lexer: LexerService;

  public constructor(params: TokenData, context: LexerService) {
    this.lexer = context;
    const { value, id, line, column, length } = params;
    this.value = value;
    this.id = id;
    this.line = line;
    this.column = column;
    this.length = length;
  }
  public setValue(newValue: string, update = true) {
    this.value = newValue;
    this.length = newValue.length;
    if (update) {
      this.lexer.update();
    }
    return this;
  }
  public moveTo(line?: number, column?: number, update = true) {
    line && (this.line = line);
    column && (this.column = column);
    if (update) {
      this.lexer.update();
    }
    return this;
  }
  public moveBy(line?: number, column?: number, update = true) {
    line && (this.line += line);
    column && (this.column += column);
    if (update) {
      this.lexer.update();
    }
    return this;
  }
  public set(params: Partial<TokenData>, update = true) {
    this.value = params.value || this.value;
    this.id = params.id || this.id;
    this.line = params.line || this.line;
    this.column = params.column || this.column;
    this.length = params.length || this.length;
    if (update) {
      this.lexer.update();
    }
    return this;
  }
}
