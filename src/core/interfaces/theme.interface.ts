export interface ITheme extends ISimplifiedTheme {
  url: string;
  __unicode__: string;
}

export interface ISimplifiedTheme {
  id: number;
  name: string;
  short_name: string;
}
