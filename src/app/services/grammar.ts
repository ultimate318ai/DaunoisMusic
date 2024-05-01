export type LanguageKeyword = 'program begin' | 'program end';

export type MiscKeyword = 'newline' | 'whitespace';

export interface GrammarToken {
  id: LanguageKeyword | MiscKeyword;
  match: string;
}

const grammar: GrammarToken[] = [
  {
    id: 'newline',
    match: '\\n',
  },
  {
    id: 'whitespace',
    match: '\\s',
  },
];

export default grammar;
