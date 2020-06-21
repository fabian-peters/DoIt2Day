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
          description: 'Test description',
          completed: false,
          urgent: true,
          important: true,
          targetDate: new Date()
        },
        {
          id: 2,
          title: 'Test item 2 with a really, really long title',
          description: 'Test description',
          completed: false,
          urgent: false,
          important: false,
          targetDate: new Date('2020-06-24')
        },
        {
          id: 3,
          title: 'Test item 3 long title',
          description: 'Test description',
          completed: false,
          urgent: false,
          important: false,
          targetDate: new Date('2020-06-23')
        },
        {
          id: 4,
          title: 'Test item 4',
          description: 'Test description',
          completed: false,
          urgent: true,
          important: false,
          targetDate: new Date('2020-06-22')
        },
        {
          id: 5,
          title: 'Test item 5',
          description: 'Test description',
          completed: false,
          urgent: false,
          important: true,
          targetDate: new Date('2020-06-26')
        }
      ]};
  }

  genId(items: Item[]): number {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 0;
  }

}
