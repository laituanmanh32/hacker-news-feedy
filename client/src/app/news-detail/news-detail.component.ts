import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
              private router: Router,
              public newsService: NewsService,
              private ref: ChangeDetectorRef) {
    this.routerSub = route.paramMap.subscribe(async param => {
      this.news = await this.newsService.getNews(param.get('id'));
      this.ref.detectChanges()
    })
  }

  ngOnInit(): void {
  }

  back() {
    console.log("BACK")
    this.router.navigateByUrl('/');

  }

}
