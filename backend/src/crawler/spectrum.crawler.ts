import { News } from "../../shared/news.model";
import { ACrawler } from "./ACrawler";
// @ts-ignore
import {Root} from "cheerio";

export class SpectrumCrawler extends ACrawler<News> {
    constructor() {
        super();
        this.scraper = 'puppeteer';
    }
    handleHtml($: Root): News {
        const blogInner =  $('#blog-inner').html();
        const articleVideo =  $('#article-detail-video').html();

        let body_html = blogInner || articleVideo;
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
