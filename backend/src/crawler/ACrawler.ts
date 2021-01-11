import p = require('phin');
import cheerio = require('cheerio');
import puppeteer = require('puppeteer');

export abstract class ACrawler<T> {
    scraper: 'phin' | 'puppeteer';

    public async craw(url: string): Promise<T> {
        const html = await this.loadHTML(url);
        return this.handleHtml(html);
    }

    private async loadHTML(url): Promise<string> {
        let content = '';
        if(this.scraper == 'puppeteer') {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);
            await page.waitForTimeout(500);
            content = await page.content();
    
            await browser.close();
        } else {
            const response = await p(url);
            content = response.body.toString();
        }
        
        return content;
    }

    abstract handleHtml(html: string): T;

}