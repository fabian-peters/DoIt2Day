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
          title: 'Test item 1',
          description: 'Should be third in Up next',
          completed: false,
          urgent: false,
          important: false,
          targetDate: new Date()
        },
        {
          id: 2,
          title: 'Test item 2 with a really, really long title',
          description: 'Should be second in Up next',
          completed: false,
          urgent: false,
          important: true,
          targetDate: new Date('2020-07-01')
        },
        {
          id: 3,
          title: 'Test item 3 long title',
          description: 'Should be first in Up next',
          completed: false,
          urgent: true,
          important: false,
          targetDate: new Date('2020-06-20')
        },
        {
          id: 4,
          title: 'Test item 4',
          description: 'Should not be in Up next',
          completed: false,
          urgent: true,
          important: true,
          targetDate: new Date('2020-07-22')
        },
        {
          id: 5,
          title: 'Test item 5',
          description: 'Should not be in Up next',
          completed: false,
          urgent: false,
          important: false,
          targetDate: new Date('2020-07-26')
        }
      ]};
  }

  genId(items: Item[]): number {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 0;
  }

}
