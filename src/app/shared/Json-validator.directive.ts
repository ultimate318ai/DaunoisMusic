import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as jsonSchema from 'jsonschema';

const mainSchema = {
  id: '/main',
  type: 'object',
  properties: {
    name: { type: 'string', required: true },
    size: {
      type: 'string',
      pattern: '^(small|normal|large|Large)$',
      required: true,
    },
  },
};
/** Json validator with JSON schema */
export function invalidJsonValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // const extraParams = { nestedErrors: true }; TODO: use it if necessary

    const rawValue = control.value;
    try {
      const jsonValue = JSON.parse(rawValue);
      const validator = new jsonSchema.Validator();
      const result = validator.validate(jsonValue, mainSchema);
      7;
      const { valid, errors } = result;
      console.log(valid);
      return !valid
        ? {
            invalidJson: {
              value: errors.map((error) => {
                console.log(error);
                return `(${error.property}) : ${error.message}.`;
              }),
            },
          }
        : null;
    } catch (error) {
      if (!(error instanceof SyntaxError)) {
        throw error;
      }
      return {
        invalidJson: {
          value: [error.message],
        },
      };
    }
  };
}
