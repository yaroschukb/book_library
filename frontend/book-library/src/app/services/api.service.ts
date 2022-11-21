import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { threadId } from 'worker_threads';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  private _refreshList = new Subject<void>();
  get refresh() {
    return this._refreshList;
  }
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('api/books');
  }
  addBook(body: any): Observable<Book> {
    return this.http.post<Book>('api/books', body).pipe(
      tap(() => {
        this.refresh.next();
      })
    );
  }
  deleteBook(id: any): Observable<any> {
    console.log(id);
    return this.http.delete<Book>(`api/books/${id}`).pipe(
      tap(() => {
        this.refresh.next();
      })
    );
  }
}
