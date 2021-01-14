import hackerNewsCrawler, {HackerNewsCrawler, HackerNewsList} from "../src/crawler/hacker-news.crawler";
import {NYTimesCrawler} from "../src/crawler/ny-times.crawler";
import {BuzzFeedNewsCrawler} from "../src/crawler/buzz-feed-news.crawler";
import {SpectrumCrawler} from "../src/crawler/spectrum.crawler";
var assert = require('chai').assert;

describe('Test Hacker News crawl', async function() {
    const hackerNewsCrawler = new HackerNewsCrawler();

    it('Crawl 30 items', async function() {
        let items = await hackerNewsCrawler.craw('https://news.ycombinator.com/best');
        assert.isArray(items, "is Array of HackerNewsItem");
        assert.lengthOf(items, 30, '30 HackerNewsItem on 1st page');
    })
    it('Each item has fulfill data', async function() {
        let items = await hackerNewsCrawler.craw('https://news.ycombinator.com/best');
        for (let item of items) {
            assert.notStrictEqual(item.id, null);
            assert.notStrictEqual(item.title, null);
            assert.notStrictEqual(item.url, null);
        }
    })
})

describe('Test Other News Crawler', async function() {
    const hackerNewsCrawler = new HackerNewsCrawler();
    let hNewsItems: HackerNewsList = [];
    let page = 0;
    before(async function() {
        this.timeout(10000);
        while(true) {
            page++;
            let newsItems = await hackerNewsCrawler.craw(`https://news.ycombinator.com/best?p=${page}`);
            if(!newsItems.length) {
                break;
            }
            hNewsItems = hNewsItems.concat(newsItems);
        }
    })

    it('Crawl news page from NewYorkTimes', async function () {
        const nyCrawler = new NYTimesCrawler();
        let nyHNewsItems = hNewsItems.filter(hNews => hNews.url.includes('www.nytimes.com'));
        this.timeout(2000 * nyHNewsItems.length);
        for (let nyHNewsItem of nyHNewsItems) {
            const news = await nyCrawler.craw(nyHNewsItem.url);
            assert.notStrictEqual(news.body_html, null);
            assert.notStrictEqual(news.image, null);
            assert.strictEqual(news.source, 'TheNewYorkTimes');
        }
    })

    it('Crawl news page from BuzzFeedNews', async function () {
        const buzzCrawler = new BuzzFeedNewsCrawler();
        let BuzzHNewsItems = hNewsItems.filter(hNews => hNews.url.includes('buzzfeednews.com'));
        this.timeout(2000 * BuzzHNewsItems.length);
        for (let BuzzHNewsItem of BuzzHNewsItems) {
            const news = await buzzCrawler.craw(BuzzHNewsItem.url);
            assert.notStrictEqual(news.body_html, null);
            assert.notStrictEqual(news.excerp, null);
            assert.notStrictEqual(news.image, null);
            assert.strictEqual(news.source, 'BuzzFeedNews');
        }
    })

    it('Crawl news page from Spectrum', async function () {
        const spectrumCrawler = new SpectrumCrawler();
        let spectrumHNewsItems = hNewsItems.filter(hNews => hNews.url.includes('spectrum.ieee.org'));
        this.timeout(10000 * spectrumHNewsItems.length);
        for (let spectrumHNewsItem of spectrumHNewsItems) {
            const news = await spectrumCrawler.craw(spectrumHNewsItem.url);
            assert.notStrictEqual(news.body_html, null);
            assert.notStrictEqual(news.excerp, null);
            assert.notStrictEqual(news.image, null);
            assert.strictEqual(news.source, 'Spectrum');
        }
    })
})
