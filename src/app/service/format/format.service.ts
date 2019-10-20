import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class FormatService {

  constructor() { }

  public unificationOptions(array: OptionInterface[], sortByField: string): void {
    const sortedCopy = [...array.sort((first, second) => first[sortByField].localeCompare(second[sortByField]))];
    array.splice(0, array.length);
    array.push(...sortedCopy.filter((item, index, arr) => !arr[index + 1] || item.id !== arr[index + 1].id));
  }

  public isOptionSearched(option: OptionInterface, search: string): boolean {
    return option.name.includes(search) || option.short_name.includes(search) || option.slug.includes(search);
  }

  public unsubscribeFromAllSubscriptions(subscriptions: Subscription[]): void {
    subscriptions.forEach(subscription => subscription ? subscription.unsubscribe() : undefined);
  }
}
