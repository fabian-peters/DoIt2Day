import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Item} from './item';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    return {items: [
        {
          id: 1,
          title: 'Test item',
          description: 'Test description',
          completed: false,
          urgent: true,
          important: true,
          targetDate: '2020-06-21'
        },
        {
          id: 2,
          title: 'Test item 2',
          description: 'Test description',
          completed: false,
          urgent: false,
          important: false,
          targetDate: '2020-06-24'
        }
      ]};
  }

  genId(items: Item[]): number {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 0;
  }

}
