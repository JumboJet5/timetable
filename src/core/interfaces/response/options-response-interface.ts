import { OptionInterface } from 'src/core/interfaces/option.interface';

export interface OptionsResponseInterface {
  next: string | null;
  previous: string | null;
  count: number;
  results: OptionInterface[];
}
