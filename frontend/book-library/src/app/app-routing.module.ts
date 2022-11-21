import { AddingBookComponent } from './componets/adding-book/adding-book.component';
import { PlannedComponent } from './main-display/planned/planned.component';
import { HomeComponent } from './main-display/home/home.component';
import { ReadingComponent } from './main-display/reading/reading.component';
import { MainDisplayComponent } from './main-display/main-display.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadComponent } from './main-display/read/read.component';
import { LibraryComponent } from './main-display/library/library.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'adding-book',
    component: AddingBookComponent,
  },
  {
    path: 'reading',
    component: ReadingComponent,
  },
  {
    path: 'planned',
    component: PlannedComponent,
  },
  {
    path: 'read',
    component: ReadComponent,
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
