import { ApiService } from '../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  constructor(private api: ApiService) {}
  // books: any = [
  //   {
  //     author: 'London',
  //     rate: 4,
  //     description: 'This book about... Bery nice... This wolf... Sad end...',
  //   },
  //   {
  //     author: 'Brown',
  //     rate: 5,
  //     description:
  //       'This book about... Very exited... travels... arcitecture... art, museum',
  //   },
  //   {
  //     author: 'Smith',
  //     rate: 4,
  //     description: 'This book about... Any thing about poetry',
  //   },
  //   {
  //     author: 'Harary',
  //     rate: 3,
  //     description: 'This book about... Philosophy... Humanity... Future... ',
  //   },
  //   {
  //     author: 'Taleb',
  //     rate: 2,
  //     description: 'This book about... air saler... ',
  //   },
  //   {
  //     author: 'Taleb',
  //     rate: 2,
  //     description: 'This book about... air saler... ',
  //   },
  //   {
  //     author: 'Taleb',
  //     rate: 2,
  //     description: 'This book about... air saler... ',
  //   },
  //   {
  //     author: 'Taleb',
  //     rate: 2,
  //     description: 'This book about... air saler... ',
  //   },
  // ];
  books: any = [];
  ngOnInit(): void {
    this.api.getBooks().subscribe((res) => {
      console.log(res);

      this.books = res;
    });
  }
}
