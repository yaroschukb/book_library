import { ApiService } from './../../services/api.service';
import { Book } from './../../interfaces/book';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {
  @Input() book: Book = {};
  // @Input() editCard:(args:any)=>void;
  // @Input() deleteCard();

  constructor(private api: ApiService) {}

  ngOnInit(): void {}
  editCard(book: Book) {
    console.log('Edit', book);
  }
  deleteCard(book: Book) {
    console.log('delete', book);
    return this.api.deleteBook(book._id).subscribe((i) => {
      console.log('d', i);
    });
  }
}
