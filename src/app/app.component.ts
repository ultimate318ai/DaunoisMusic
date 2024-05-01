import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompilerService } from './services/compiler.service';
import Token from './services/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'DaunoisMusic';

  @Output() tokenSubmitted: EventEmitter<Token[]> = new EventEmitter();

  form: FormGroup;

  constructor(private compilerService: CompilerService) {
    this.form = new FormGroup({
      code: new FormControl(['', Validators.required]),
    });
  }

  get code(): string {
    const ramValue = this.form.get('code')?.value;
    return ramValue ?? '';
  }

  sendCodeToCompiler(code: string) {
    const tokenList = this.compilerService.processLexerCode(code);
    this.tokenSubmitted.emit(tokenList);
  }
}
