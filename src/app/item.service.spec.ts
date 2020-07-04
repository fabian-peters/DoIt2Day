import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ItemService } from './item.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Item } from './item';

describe('ItemService', () => {
  let itemService: ItemService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [ItemService]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    itemService = TestBed.inject(ItemService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(itemService).toBeTruthy();
  });

  /**************************
   * itemService.getItems() *
   **************************/
  describe('#getItems', () => {

    it('should return expected items', () => {
      const expectedItems = [
        {
          id: 0,
          title: 'Mock item 1',
          description: 'This is a mocked item for testing',
          completed: false,
          urgent: false,
          important: true,
          targetDate: new Date()
        },
        {
          id: 1,
          title: 'Mock item 2',
          description: 'This is a mocked item for testing',
          completed: false,
          urgent: true,
          important: false,
          targetDate: new Date('2020-10-02')
        }
      ] as Item[];

      itemService.getItems().subscribe(
        items => expect(items).toEqual(expectedItems, 'should return expected items'),
        fail
        );

      const req = httpTestingController.expectOne(itemService.itemsUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedItems);
    });

    it('should be OK returning no items', () => {
      itemService.getItems().subscribe(
        items => expect(items.length).toEqual(0, 'should have empty items array'),
        fail
      );

      const req = httpTestingController.expectOne(itemService.itemsUrl);
      expect(req.request.method).toEqual('GET');

      req.flush([]);
    });

    // TODO needs error handling implemented
    xit('should turn 404 into an empty items result', () => {
      itemService.getItems().subscribe(
        items => expect(items.length).toEqual(0, 'should return empty items array'),
        fail
      );

      const req = httpTestingController.expectOne(itemService.itemsUrl);
      expect(req.request.method).toEqual('GET');

      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

    // TODO test multiple calls

  });

  /****************************
   * itemService.updateItem() *
   ****************************/
  describe('#updateItem', () => {

    it('should update an item and return it', () => {
      const updateItem: Item = {
        id: 0,
        title: 'Mock item 1',
        description: 'This is a mocked item for testing #updateItem',
        completed: false,
        urgent: true,
        important: true,
        targetDate: new Date('2020-10-02')
      };

      itemService.updateItem(updateItem).subscribe(
        item => expect(item).toEqual(updateItem, 'should return the item'),
        fail
      );

      const req = httpTestingController.expectOne(itemService.itemsUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updateItem);

      req.flush(updateItem);
    });

    // TODO needs error handling implemented
    xit('should turn 404 error into return of the update item', () => {
      const updateItem: Item = {
        id: 1,
        title: 'Mock item 2',
        description: 'This is a mocked item for testing #updateItem',
        completed: false,
        urgent: false,
        important: true,
        targetDate: new Date('2020-08-11')
      };

      itemService.updateItem(updateItem).subscribe(
        item => expect(item).toEqual(updateItem, 'should return the updated hero'),
        fail
      );

      const req = httpTestingController.expectOne(itemService.itemsUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updateItem);

      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });
  });

  /*************************
   * itemService.addItem() *
   *************************/
  describe('#addItem', () => {

    it('should add an item and return it', () => {
      const newItem: Item = {
        title: 'New mock Item',
        description: 'This is a mocked item for testing #addItem',
        completed: false,
        urgent: true,
        important: false,
        targetDate: new Date('2020-08-14')
      } as Item;

      const expectedItem: Item = {
        id: 0,
        title: 'New mock Item',
        description: 'This is a mocked item for testing #addItem',
        completed: false,
        urgent: true,
        important: false,
        targetDate: new Date('2020-08-14')
      } as Item;

      itemService.addItem(newItem).subscribe(
        item => expect(item).toEqual(expectedItem, 'should return item'),
        fail
      );

      const req = httpTestingController.expectOne(itemService.itemsUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(newItem);

      const expectedResponse = new HttpResponse({status: 201, statusText: 'Created', body: expectedItem});
      req.event(expectedResponse);
    });

    // TODO test 404

    // TODO test multiple calls

  });

  /****************************
   * itemService.deleteItem() *
   ****************************/
  describe('#deleteItem', () => {

    it('should delete a given item', () => {
      const deleteItem: Item = {
        id: 5,
        title: 'Mock item to delete',
        description: 'This is a mocked item for testing #deleteItem',
        completed: false,
        urgent: false,
        important: false,
        targetDate: new Date('2000-01-01')
      };

      itemService.deleteItem(deleteItem).subscribe(
        data => expect(data).toBeNull(),
        fail
      );

      const req = httpTestingController.expectOne(`${itemService.itemsUrl}/${deleteItem.id}`);
      expect(req.request.method).toEqual('DELETE');

      const expectedResponse = new HttpResponse({status: 204, statusText: 'No Content'});
      req.event(expectedResponse);
    });

    it('should delete an item with given id', () => {
      const itemId = 42;

      itemService.deleteItem(itemId).subscribe(
        data => expect(data).toBeNull(),
        fail
      );

      const req = httpTestingController.expectOne(`${itemService.itemsUrl}/${itemId}`);
      expect(req.request.method).toEqual('DELETE');

      const expectedResponse = new HttpResponse({status: 204, statusText: 'No Content'});
      req.event(expectedResponse);
    });

    // TODO test 404

    // TODO test multiple calls

  });

});
