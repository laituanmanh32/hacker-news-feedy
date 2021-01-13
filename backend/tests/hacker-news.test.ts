import {HackerNewsCrawler} from "../src/crawler/hacker-news.crawler";
import * as assert from "assert";

describe('Test Hacker News crawl', async function() {
    const hackerNewsCrawler = new HackerNewsCrawler();

    it('Crawl 30 items', async function() {
        let items = await hackerNewsCrawler.craw('https://news.ycombinator.com/best');
        assert.strictEqual(30, items.length);
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
