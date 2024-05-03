import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { invalidJsonValidator } from './shared/Json-validator.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'DaunoisMusic';

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      code: new FormControl('{}', [
        Validators.required,
        invalidJsonValidator(),
      ]),
    });
  }

  get code() {
    const control = this.form.get('code');
    if (!control) {
      throw new Error("No control for field 'code' in form.");
    }
    return control;
  }

  get codeErrors() {
    const control = this.form.get('code');
    if (!control) {
      throw new Error("No control for field 'code' in form.");
    }
    return control?.errors?.['invalidJson']?.value;
  }
}
