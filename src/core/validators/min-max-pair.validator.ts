import { FormGroup, ValidatorFn } from '@angular/forms';
import { dynamicMax, dynamicMin } from 'src/core/validators/limits.validator';

export default function minMaxPair(minFieldName: string, maxFieldName: string,
                                   minFieldValidators: ValidatorFn[] = [], maxFieldValidators: ValidatorFn[] = []): ValidatorFn {
  let minControl;
  let maxControl;
  let minValue;
  let maxValue;

  return (group: FormGroup) => {
    if (group.get(minFieldName) && minControl !== group.get(minFieldName)) {
      minControl = group.get(minFieldName);
      minValue = minControl.value;
      minControl.setValidators([...minFieldValidators, dynamicMax(() => group.get(maxFieldName).value)]);
    }

    if (group.get(maxFieldName) && maxControl !== group.get(maxFieldName)) {
      maxControl = group.get(maxFieldName);
      maxValue = maxControl.value;
      maxControl.setValidators([...maxFieldValidators, dynamicMin(() => group.get(minFieldName).value)]);
    }

    if (minControl && minValue !== minControl.value) {
      minValue = minControl.value;
      if (maxControl) maxControl.updateValueAndValidity();
    }

    if (maxControl && maxValue !== maxControl.value) {
      maxValue = maxControl.value;
      if (minControl) minControl.updateValueAndValidity();
    }

    return null;
  };
}
