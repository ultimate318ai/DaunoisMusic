import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Terminal } from '@xterm/xterm';
// import * as child from 'child_process'; # to use in python backend!

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
    this.terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $');
    // this.executeCommand('ls');
  }

  // executeCommand(command: string) {
  //   const execution: child.ChildProcess = child.exec(command);
  //   const execution_stdout = execution.stdout?.read();
  //   this.terminal.write(execution_stdout);
  // }
}
