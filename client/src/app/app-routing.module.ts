import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsFeedComponent} from "./news-feed/news-feed.component";
import {NewsDetailComponent} from "./news-detail/news-detail.component";

const routes: Routes = [
  {
    path: '',
    component: NewsFeedComponent
  },
  {
    path: ':id',
    component: NewsDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
