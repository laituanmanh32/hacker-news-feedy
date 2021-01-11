import { ACrawler } from "./ACrawler";
import cheerio = require('cheerio');

export interface HackerNewsItem {
    id: string;
    title: string;
    url: string;

}

export type HackerNewsList = HackerNewsItem[];

export class HackerNewsCrawler extends ACrawler<HackerNewsList> {
    handleHtml(html: string): HackerNewsList {
        const $ = cheerio.load(html);

        const $athings = $('.athing');

        const hackerNewsList: HackerNewsList = $athings.toArray().map($athing => {

            const $storylink = $($athing).find('.storylink');

            const id = $($athing).attr('id');
            const title = $storylink.text();
            const url = $storylink.attr('href');

            return {
                id,
                title,
                url
            }
        });


        return hackerNewsList;
    }
    
}

const hackerNewsCrawler = new HackerNewsCrawler();
export default hackerNewsCrawler;