import {ACrawler} from "./ACrawler";
// @ts-ignore
import {Root} from "cheerio";

export interface HackerNewsItem {
    id: string;
    title: string;
    url: string;

}

export type HackerNewsList = HackerNewsItem[];

export class HackerNewsCrawler extends ACrawler<HackerNewsList> {
    handleHtml($: Root): HackerNewsList {
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
