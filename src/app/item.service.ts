import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  baseUrl = 'http://localhost:4001'; // TODO properly get base url
  itemsUrl = this.baseUrl + '/api/items';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient
  ) { }

  // TODO add error handling and logging to server requests
  /** GET: get items from the server */
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl);
  }

  /** PUT: update the item in the server */
  updateItem(item: Item): Observable<any> {
    return this.http.put(`${this.itemsUrl}/${item._id}`, item, this.httpOptions);
  }

  /** POST: add a new item to the server */
  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, item, this.httpOptions);
  }

  /** DELETE: delete the item from the server */
  deleteItem(item: Item | string): Observable<Item> {
    const id = typeof item === 'string' ? item : item._id;
    const url = `${this.itemsUrl}/${id}`;

    return this.http.delete<Item>(url, this.httpOptions);
  }

}
