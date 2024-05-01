import { AbstractExpression } from './AbstractExpression';
import { CompilationError } from './Error';

export class SheetMusic {
  size: string;
  body: Array<AbstractExpression>;

  constructor(size: string) {
    this.size = size;
    this.body = [];
  }

  parse() {
    if (
      this.size !== 'small' &&
      this.size !== 'large' &&
      this.size !== 'Large'
    ) {
      throw new CompilationError(
        `Wrong size given for SheetMusic : ${this.size}`
      );
    }
    this.body.forEach((bodyExpression) => bodyExpression.parse());
  }

  toString(): string {
    const bodyString = this.body
      .map((bodyElement) => bodyElement.toString())
      .reduce(
        (accumulatorString, currentString) =>
          accumulatorString.concat(currentString),
        ''
      );
    return `(SheetMusic<${this.size}>) : {${bodyString}}\n`;
  }
}
