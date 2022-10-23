import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'main-display',
  templateUrl: './main-display.component.html',
  styleUrls: ['./main-display.component.scss'],
})
export class MainDisplayComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  activeMenu: boolean = false;
  openMenu() {
    this.activeMenu = !this.activeMenu;
  }
}
