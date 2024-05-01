import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Terminal } from '@xterm/xterm';
import Token from '../services/types';

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
export class TerminalComponent implements OnInit {
  private terminal: Terminal;

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

  print(data: string): void {
    this.terminal.writeln(data);
  }

  onTokenSubmitted(tokenList: Token[]) {
    this.print(tokenList);
  }
}
