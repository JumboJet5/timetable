import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';

export const appearAnimation = trigger('appearAnimation', [
  transition('* <=> *', [
    group([
      query(':leave', [style({position: 'relative', opacity: 1, width: '*', height: '*'})], {optional: true}),
      query(':leave', [animate('0.5s ease', style({opacity: 0, width: 0, height: 0}))], {optional: true}),
    ]),
    group([
      query(':enter', [style({position: 'relative', opacity: 0, width: 0, height: 0})], {optional: true}),
      query(':enter', [animate('0.5s ease', style({opacity: 1, width: '*', height: '*'}))], {optional: true}),
      query('@modalGrowthTransitionAnimation', animateChild(), {optional: true}),
    ]),
  ]),
]);
