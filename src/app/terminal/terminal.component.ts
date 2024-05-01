import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { Terminal } from '@xterm/xterm';

@Component({
  selector: 'app-terminal',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [],
  templateUrl: './terminal.component.html',
  styleUrls: [
    '../../../node_modules/@xterm/xterm/css/xterm.css',
    './terminal.component.css',
  ],
})
export class TerminalComponent implements OnInit, OnChanges {
  private terminal: Terminal;

  @Input() tokenSubmitted: string[] = [];
  @Input() astTree: string = '';

  constructor() {
    this.terminal = new Terminal();
  }
  ngOnInit(): void {
    const terminalElement = document.getElementById('terminal');
    if (!terminalElement)
      throw new Error('No Html element found for terminal.');
    this.terminal.open(terminalElement);
    this.terminal.writeln('Hello from \x1B[1;3;31mxterm.js\x1B[0m $');
  }

  ngOnChanges(changes: SimpleChanges): void {
    const tokenChanges = changes['tokenSubmitted'];
    if (tokenChanges && tokenChanges.currentValue != tokenChanges.previousValue)
      this.clearAndPrint(tokenChanges.currentValue);

    const astChanges = changes['astTree'];

    if (astChanges && astChanges.currentValue != astChanges.previousValue)
      this.clearAndPrintDatum(astChanges.currentValue);
  }

  print(data: string[]): void {
    data.forEach((datum) => this.printDatum(datum));
  }

  printDatum(datum: string): void {
    this.terminal.writeln(datum);
  }

  clear(): void {
    this.terminal.clear();
  }

  clearAndPrint(data: string[]) {
    this.clear();
    this.print(['------------------------------------', '\n\n\n']);
    this.print(data);
  }

  clearAndPrintDatum(datum: string) {
    this.clear();
    this.print(['------------------------------------', '\n\n\n']);
    this.printDatum(datum);
  }
}
