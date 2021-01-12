import {ACrawler} from "./ACrawler";
import {News} from "../../../shared/news.model";
// @ts-ignore
import {Root} from "cheerio";

export class BuzzFeedNewsCrawler extends ACrawler<News> {
    constructor() {
        super();
        this.scraper = 'puppeteer';
    }
    handleHtml($: Root): News {

        let $article = $('#mod-article-wrapper-1');
        $article.find('script').remove();
        $article.find('style').remove();
        $article.find('.ad-inline').remove();
        let body_html = $article.html();
        body_html = body_html.replace(/\n/g, '');
        return {
            id: null,
            title: null,
            excerp: null,
            body_html: body_html,
            image: null,
            origin_url: null,
        };
    }

}
