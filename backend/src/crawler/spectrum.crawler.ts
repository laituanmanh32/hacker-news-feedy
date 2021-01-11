import { News } from "news.model";
import { ACrawler } from "./ACrawler";

import cheerio = require('cheerio');

export class SpectrumCrawler extends ACrawler<News> {
    constructor() {
        super();
        this.scraper = 'puppeteer';
    }
    handleHtml(html: string): News {
        const $ = cheerio.load(html);

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