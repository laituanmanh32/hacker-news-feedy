import {Component, OnInit} from '@angular/core';
import {NewsService} from "../news.service";
import {News} from "../../../../shared/news.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {

  constructor(public newsService: NewsService,
              public router: Router) {
  }

  ngOnInit(): void {
  }

  toDetail(news: News) {
    this.router.navigateByUrl(news.id);
  }

}
