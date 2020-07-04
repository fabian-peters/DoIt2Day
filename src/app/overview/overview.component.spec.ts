import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewComponent } from './overview.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  let overdueButton: HTMLElement;
  let urgentButton: HTMLElement;
  let importantButton: HTMLElement;
  let viewAllButton: HTMLElement;

  const tomorrow: Date = new Date(new Date().setDate(new Date().getDate() + 1));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;

    // find elements
    const overviewElement = fixture.nativeElement;
    const buttons = overviewElement.querySelectorAll('a');

    overdueButton = buttons[0];
    urgentButton = buttons[1];
    importantButton = buttons[2];
    viewAllButton = buttons[3];

    // simulate the parent setting the input property with mock items
    // parent is responsible to filter completed items!
    component.items = [
      {
        _id: '5f0104fdff2dc153583f5231',
        title: 'Mock item 1',
        description: 'This is a mocked overdue item',
        completed: false,
        urgent: false,
        important: false,
        targetDate: new Date('2020-01-01')
      },
      {
        _id: '5f0104fd3e2dc153583f53ea',
        title: 'Mock item 2',
        description: 'This is a mocked urgent item',
        completed: false,
        urgent: true,
        important: false,
        targetDate: tomorrow
      },
      {
        _id: '5f0104fd6a2dc153583f558b',
        title: 'Mock item 3',
        description: 'This is a mocked important item',
        completed: false,
        urgent: false,
        important: true,
        targetDate: tomorrow
      },
      {
        _id: '5f0104f5e22dc153583f51a2',
        title: 'Mock item 4',
        description: 'This is a mocked important item',
        completed: false,
        urgent: false,
        important: true,
        targetDate: tomorrow
      },
      {
        _id: '5f0104fd19e4c153583f53e1',
        title: 'Mock item 5',
        description: 'This is a mocked overdue and important item',
        completed: false,
        urgent: false,
        important: true,
        targetDate: new Date()
      }
    ];

    // trigger initial data binding
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set current date to today', () => {
    const today = new Date();
    const actualDate = component.currentDate;

    // We're only interested in the year, month and day
    today.setHours(0, 0, 0, 0);
    actualDate.setHours(0, 0, 0, 0);

    expect(actualDate).toEqual(today);
  });

  it('should calculate the correct number of overdue items', () => {
    expect(component.numberOfOverdueItems).toEqual(2);
  });

  it('should calculate the correct number of urgent items', () => {
    expect(component.numberOfUrgentItems).toEqual(1);
  });

  it('should calculate the correct number of important items', () => {
    expect(component.numberOfImportantItems).toEqual(3);
  });

  it('should show correct buttons', () => {
    expect(overdueButton.textContent).toEqual('hourglass_bottom');
    expect(urgentButton.textContent).toEqual('notifications_active');
    expect(importantButton.textContent).toEqual('priority_high');
    expect(viewAllButton.textContent).toEqual('view all');
  });

  // TODO not working
  xit('should show correct numbers on badge', () => {
    console.log(overdueButton);
    console.log(overdueButton.querySelector('mat-icon'));

    expect(overdueButton.querySelector('mat-icon').getAttribute('matBadge')).toEqual('1');
    expect(urgentButton.querySelector('mat-icon').getAttribute('matBadge')).toEqual('1');
    expect(importantButton.querySelector('mat-icon').getAttribute('matBadge')).toEqual('1');
  });

  // TODO use RouterLinkDirectiveStub? see https://angular.io/guide/testing#components-with-routerlink
  it('should link to the correct pages', () => {
    expect(overdueButton.getAttribute('routerLink')).toEqual('/all/overdue');
    expect(urgentButton.getAttribute('routerLink')).toEqual('/all/urgent');
    expect(importantButton.getAttribute('routerLink')).toEqual('/all/important');
    expect(viewAllButton.getAttribute('routerLink')).toEqual('/all');
  });

});
