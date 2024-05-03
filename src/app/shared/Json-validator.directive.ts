import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as jsonSchema from 'jsonschema';

const mainSchema = {
  id: '/main',
  type: 'object',
  properties: {
    name: { type: 'string' },
    size: { type: 'string', pattern: '^(small|large|Large)$' },
  },
};
/** Json validator with JSON schema */
export function invalidJsonValidator(jsonInstance: JSON): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // const extraParams = { nestedErrors: true }; TODO: use it if necessary
    const validator = new jsonSchema.Validator();
    const result = validator.validate(jsonInstance, mainSchema);
    const { valid, errors } = result;
    return !valid
      ? {
          invalidJson: {
            value: errors.map((error) => error.name),
          },
        }
      : null;
  };
}
