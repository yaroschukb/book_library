import { BookCardComponent } from './componets/book-card/book-card.component';
import { BookListComponent } from './main-display/book-list/book-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { AppComponent } from './app.component';
import { MainDisplayComponent } from './main-display/main-display.component';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LibraryComponent } from './main-display/library/library.component';
import { LoaderComponent } from './componets/loader/loader.component';
import { EmptyListComponent } from './componets/empty-list/empty-list.component';
import { HomeComponent } from './main-display/home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    MainDisplayComponent,
    BookCardComponent,
    BookListComponent,
    LibraryComponent,
    LoaderComponent,
    EmptyListComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent, ApiService, HttpClientModule],
})
export class AppModule {}
