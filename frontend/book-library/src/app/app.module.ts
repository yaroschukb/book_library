import { AddingBookComponent } from './componets/adding-book/adding-book.component';
import { BookCardComponent } from './componets/book-card/book-card.component';
import { ReadingComponent } from './main-display/reading/reading.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { AppComponent } from './app.component';
import { MainDisplayComponent } from './main-display/main-display.component';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReadComponent } from './main-display/read/read.component';
import { LoaderComponent } from './componets/loader/loader.component';
import { EmptyListComponent } from './componets/empty-list/empty-list.component';
import { HomeComponent } from './main-display/home/home.component';
import { PlannedComponent } from './main-display/planned/planned.component';
import { CategorySelectorComponent } from './componets/category-selector/category-selector.component';
import { LibraryComponent } from './main-display/library/library.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    MainDisplayComponent,
    BookCardComponent,
    ReadingComponent,
    ReadComponent,
    LoaderComponent,
    EmptyListComponent,
    HomeComponent,
    PlannedComponent,
    AddingBookComponent,
    CategorySelectorComponent,
    LibraryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent, ApiService, HttpClientModule],
})
export class AppModule {}
