import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from './../../services/api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adding-book',
  templateUrl: './adding-book.component.html',
  styleUrls: ['./adding-book.component.scss'],
})
export class AddingBookComponent implements OnInit {
  constructor(
    private api: ApiService,
    private modalService: NgbModal,
    public modal: NgbActiveModal
  ) {}
  addBookForm = new FormGroup({
    author: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
  });
  ngOnInit(): void {}
  onSubmit() {
    console.log(this.addBookForm.value);
    this.api.addBook(this.addBookForm.value).subscribe((item) => {
      console.log(item);
      this.modalService.dismissAll();
    });
  }
}
