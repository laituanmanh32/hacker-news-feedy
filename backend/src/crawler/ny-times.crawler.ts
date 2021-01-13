import {ACrawler} from "./ACrawler";
import {News} from "../../../shared/news.model";
// @ts-ignore
import {Root} from "cheerio";

export class NYTimesCrawler extends ACrawler<News> {
    handleHtml($: Root): News {

        let $body = $('section[name=articleBody]');
        let body_html = $body.html();
        let image = $('header').find('img').first().attr('src');

         return {
            id: null,
            title: null,
            excerp: null,
            body_html: body_html,
            image: image,
            origin_url: null,
            source: 'TheNewYorkTimes'
        };
    }

}
