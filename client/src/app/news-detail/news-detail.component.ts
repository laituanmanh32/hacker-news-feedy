import {Component, OnInit} from '@angular/core';
import {News} from "../../../../shared/news.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {NewsService} from "../news.service";

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {

  news: News

  routerSub: Subscription;

  constructor(private route: ActivatedRoute,
              public newsService: NewsService) {
    this.routerSub = route.paramMap.subscribe(param => {
      this.news = this.newsService.getNews(param.get('id'));
    })
  }

  ngOnInit(): void {
  }

}
