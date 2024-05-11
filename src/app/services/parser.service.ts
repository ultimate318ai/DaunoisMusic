import { Injectable } from '@angular/core';
import {
  isKeyOfJsonMusicVariable,
  JsonMusicVariable,
  latexMapping,
} from './latexMapping';

@Injectable({
  providedIn: 'root',
})
export class ParserService {
  constructor() {}

  private jsonValue: any = {};

  get json() {
    return this.jsonValue;
  }

  parseJsonCode(rawValue: string) {
    try {
      this.jsonValue = JSON.parse(rawValue, (key: string, value: string) => {
        if (!isKeyOfJsonMusicVariable(key))
          throw new Error('Wrong key in JSON.');
        const latexMappingKeyContent = latexMapping[key];
        value = latexMappingKeyContent[value] ?? value;
      });
    } catch (error) {
      if (!(error instanceof SyntaxError)) {
        throw error;
      }
    }
  }
}
