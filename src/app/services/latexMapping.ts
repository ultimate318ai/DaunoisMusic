export type JsonMusicVariable = 'name' | 'size';
const musicVariable = ['name', 'size'];

export type LatexCode = { [k: string]: string };

export const latexMapping: Record<JsonMusicVariable, LatexCode> = {
  name: {},
  size: {
    small: '\\smallmusicsize',
    normal: '\\normalmusicsize',
    large: '\\largemusicsize',
    Large: '\\Largemusicsize',
  },
};

export function isKeyOfJsonMusicVariable(
  value: string
): value is JsonMusicVariable {
  return musicVariable.find((element) => element === value) !== undefined;
}
