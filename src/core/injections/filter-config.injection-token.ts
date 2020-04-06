import { InjectionToken } from '@angular/core';
import { IFilterConfig } from 'src/core/interfaces/filter-config.interface';

export const FILTER_CONFIG = new InjectionToken<IFilterConfig>('filter.config');
