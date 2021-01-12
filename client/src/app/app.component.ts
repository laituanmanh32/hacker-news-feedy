import { Component } from '@angular/core';
import {NewsService} from "./news.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  constructor(public newsService: NewsService) {
    this.newsService.fetchNews();
  }
}
