import { ApiService } from '../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  constructor(private api: ApiService) {}
  books: any = [];
  isLoading: boolean = false;
  ngOnInit(): void {
    this.getBooksFromDB();
  }
  getBooksFromDB() {
    this.isLoading = true;
    return this.api.getBooks().subscribe((items) => {
      this.books = items;
      this.isLoading = false;
    });
  }
}
