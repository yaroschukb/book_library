import { ApiService } from '../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/interfaces/book';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.scss'],
})
export class ReadingComponent implements OnInit {
  constructor(private api: ApiService) {}
  booksList: Array<Book> = [];
  isLoading: boolean = false;
  ngOnInit(): void {
    this.getBooksFromDB();
    this.api.refresh.subscribe(() => {
      this.getBooksFromDB();
    });
  }
  getBooksFromDB() {
    this.isLoading = true;
    return this.api.getBooks().subscribe((booksFromDB) => {
      this.booksList = booksFromDB;
      this.isLoading = false;
    });
  }
  editCard(item: Book) {
    console.log('Edit', item);
    return;
  }
  deleteCard(item: Book) {
    console.log('delete', item);
    return;
  }
}
