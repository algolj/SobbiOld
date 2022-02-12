export enum IconTarget {
  Anchor = 'HTMLAnchorElement',
  Svg = 'SVGSVGElement',
  SvgUse = 'SVGUseElement',
}

export interface IPopupValues {
  label: string;
  link?: string;
  onClick?: any;
}

export interface IOptions {
  title: string;
  value: string;
  id: string;
}
