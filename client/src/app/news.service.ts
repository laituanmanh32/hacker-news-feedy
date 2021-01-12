import {BehaviorSubject, Subject} from "rxjs";
import {News} from "../../../shared/news.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class NewsService {
  news$ = new BehaviorSubject<News[]>([])
  constructor(private http: HttpClient) {
  }

  async fetchNews() {
    let news = await this.http.get('api/news').toPromise()
    this.news$.next(news as News[]);
  }

  getNews(id) {
    return this.news$.getValue().find(news => news.id == id);
  }

}
