import { ValidatorFn } from '@angular/forms';

export function dynamicMin(getMin: () => number): ValidatorFn {
  return control => getMin && (getMin() || getMin() === 0) && control.value < getMin() ? {dynamicMin: getMin()} : null;
}

export function dynamicMax(getMax: () => number): ValidatorFn {
  return control => getMax && (getMax() || getMax() === 0) && control.value > getMax() ? {dynamicMax: getMax()} : null;
}
