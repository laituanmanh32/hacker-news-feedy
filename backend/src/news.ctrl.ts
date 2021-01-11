import { ACrawler } from 'crawler/ACrawler';
import { SpectrumCrawler } from './crawler/spectrum.crawler';
import { News } from 'news.model';
import hackerNewsCrawler, { HackerNewsList } from './crawler/hacker-news.crawler';

const Queue = require('queue');

let newsList: News[] = []; 

const newsFetchingQueue = Queue({
    autostart: true,
    concurrency: 2,
});

function getCrawler(url: string): ACrawler<News> {

    if(url.includes('spectrum.ieee.org')) {
        return new SpectrumCrawler();
    }

    return null;
}

async function fetchNews() {
    let page = 0;
    let hackerNewsList: HackerNewsList = [];
    while(true) {
        let newsItems = await hackerNewsCrawler.craw(`https://news.ycombinator.com/best?p=${page}`);
        if(!newsItems.length) {
            break;
        }
        page++;
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