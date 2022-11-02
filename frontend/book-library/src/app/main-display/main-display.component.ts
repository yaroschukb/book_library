import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'main-display',
  templateUrl: './main-display.component.html',
  styleUrls: ['./main-display.component.scss'],
})
export class MainDisplayComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}
  activeMenu: boolean = false;
  open() {
    this.activeMenu = !this.activeMenu;
  }
}
