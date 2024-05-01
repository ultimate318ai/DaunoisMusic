export type LanguageKeywordType = (typeof languageKeywordList)[number];

export type LanguageSymbolType = (typeof languageSymbolList)[number];

export interface GrammarToken {
  id: LanguageKeywordType | LanguageSymbolType;
  match: string;
}

const languageKeywordList = <const>['MusicSheet'];

const languageSymbolList = <const>[
  'newline',
  'whitespace',
  'dot separator',
  'left brace',
  'right brace',
];

const grammar: GrammarToken[] = [
  {
    id: 'newline',
    match: '\\n',
  },
  {
    id: 'whitespace',
    match: '\\s',
  },
  {
    id: 'MusicSheet',
    match: 'MusicSheet',
  },
  {
    id: 'dot separator',
    match: ':',
  },
  {
    id: 'left brace',
    match: '\\{',
  },
  {
    id: 'right brace',
    match: '\\}',
  },
];

export default grammar;
