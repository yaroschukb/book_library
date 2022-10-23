import { BookListComponent } from './main-display/book-list/book-list.component';
import { MainDisplayComponent } from './main-display/main-display.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './main-display/library/library.component';

const routes: Routes = [
  {
    path: 'books',
    component: BookListComponent,
  },
  {
    path: 'library',
    component: LibraryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
