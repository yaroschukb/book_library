import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {
  @Input() author: any;
  @Input() rate: any;
  @Input() description: any;
  constructor() {}

  ngOnInit(): void {}
}
