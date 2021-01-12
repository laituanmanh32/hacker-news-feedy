import { ACrawler } from 'crawler/ACrawler';
import { SpectrumCrawler } from './crawler/spectrum.crawler';
import { News } from '../../shared/news.model';
import hackerNewsCrawler, { HackerNewsList } from './crawler/hacker-news.crawler';
import {BuzzFeedNewsCrawler} from "./crawler/buzz-feed-news.crawler";

const Queue = require('queue');

let newsList: News[] = []; 

const newsFetchingQueue = Queue({
    autostart: true,
    concurrency: 1,
});

function getCrawler(url: string): ACrawler<News> {

    if(url.includes('spectrum.ieee.org')) {
        return new SpectrumCrawler();
    }
    if(url.includes('buzzfeednews.com')) {
        return new BuzzFeedNewsCrawler();
    }

    return null;
}

async function fetchNews() {
    let page = 0;
    let hackerNewsList: HackerNewsList = [];
    while(true) {
        page++;
        let newsItems = await hackerNewsCrawler.craw(`https://news.ycombinator.com/best?p=${page}`);
        if(!newsItems.length) {
            break;
        }
        hackerNewsList = hackerNewsList.concat(newsItems);
    }

    hackerNewsList.forEach(HNews => {
        newsFetchingQueue.push(async (cb) => {
            let crawler = getCrawler(HNews.url);
            if(!crawler) {
                console.error("url is not supported", HNews);
                cb();
                return;
            }
            let news = await crawler.craw(HNews.url);
            news.id = HNews.id;
            news.title = HNews.title;
            news.origin_url = HNews.url;
            newsList.push(news);
        })
    })

    setTimeout(() => fetchNews(), 3600000);
}

fetchNews();

export default {
    list: (req, res) => {
        res.send(newsList);
    },
    detail: (req, res) => {
        res.send("DETAIL OK");
    }
}
