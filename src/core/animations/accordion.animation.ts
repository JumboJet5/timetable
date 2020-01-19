import { animate, state, style, transition, trigger } from '@angular/animations';

export const accordionTransitionAnimation = trigger('accordionTransitionAnimation', [
  state('true', style({height: '*', padding: '*', margin: '*'})),
  state('false', style({height: 0, padding: 0, margin: 0, overflow: 'hidden'})),
  transition('true => false', [
    style({overflow: 'hidden'}),
    animate('.3s', style({height: 0, padding: 0, margin: 0})),
  ]),
  transition('false => true', [
    animate('.3s', style({height: '*', padding: '*', margin: '*', overflow: 'hidden'})),
  ]),
]);
