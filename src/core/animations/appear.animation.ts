import { animate, group, query, state, style, transition, trigger } from '@angular/animations';

export const filterAppearAnimation = trigger('filterAppearAnimation', [
  state('true', style({width: '*', opacity: 1})),
  state('false', style({width: 0, opacity: 0, overflow: 'hidden'})),
  state('*', style({width: 0, overflow: 'hidden'})),
  transition('true => false', [
    group([
      style({overflow: 'hidden'}),
      animate('.2s', style({width: 0, opacity: 0})),
    ]),
  ]),
  transition('false => true', [
    group([
      animate('.2s', style({width: '*', opacity: 1, overflow: 'hidden'})),
    ]),
  ]),
]);
