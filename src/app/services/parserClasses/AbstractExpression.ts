export abstract class AbstractExpression {
  abstract parse(): void;
  toString(): string {
    return '';
  }
}
