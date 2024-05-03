import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
}
