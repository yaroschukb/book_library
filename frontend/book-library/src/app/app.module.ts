import { BookCardComponent } from './componets/book-card/book-card.component';
import { BookListComponent } from './main-display/book-list/book-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { AppComponent } from './app.component';
import { MainDisplayComponent } from './main-display/main-display.component';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { PieChartOutline } from '@ant-design/icons-angular/icons';
import { UnorderedListOutline } from '@ant-design/icons-angular/icons';
import { LibraryComponent } from './main-display/library/library.component';
const icons: IconDefinition[] = [PieChartOutline, UnorderedListOutline];
@NgModule({
  declarations: [
    AppComponent,
    MainDisplayComponent,
    BookCardComponent,
    BookListComponent,
    LibraryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzLayoutModule,
    NzIconModule.forChild(icons),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent, ApiService, HttpClientModule],
})
export class AppModule {}
