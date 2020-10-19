import axios from 'axios';
import * as cheerio from 'cheerio';

export abstract class BaseSpider {
  abstract baseUrl: string;
  abstract topManga(): Promise<Array<Manga>>;

  protected async crawl(url: string) {
    const res = await axios(url);
    return cheerio.load(res.data);
  }

}
