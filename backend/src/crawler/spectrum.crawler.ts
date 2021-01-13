import { ACrawler } from "./ACrawler";
// @ts-ignore
import {Root} from "cheerio";
import {News} from "../../../shared/news.model";

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
        let excerp = $('.article-dek').text();
        let image = $('app-blog-detail').find('img').first().attr('src');
        return {
            id: null,
            title: null,
            excerp: excerp,
            body_html: body_html,
            image: image,
            origin_url: null,
            source: 'Spectrum'
        };
    }
}
