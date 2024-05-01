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

  tokenAsStringList: string[] = [];

  form: FormGroup;

  constructor(private compilerService: CompilerService) {
    this.form = new FormGroup({
      code: new FormControl('', [Validators.required]),
    });
  }

  get code(): string {
    const control = this.form.get('code');
    if (!control) {
      throw new Error("No form control for 'code'");
    }
    const ramValue = control.value;
    return ramValue ?? '';
  }

  sendCodeToCompiler(code: string) {
    const tokenList = this.compilerService.processLexerCode(code);
    this.tokenAsStringList = tokenList.map((token) => token.toString());
  }
}
