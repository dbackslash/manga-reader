import { ipcMain } from 'electron';
import { MangaReaderSpider } from './spiders';
import { fetchManga, getFavorites, toggleFavManga } from './database';

const spider = new MangaReaderSpider();

ipcMain.handle('topManga', (event) => {
  return spider.topManga();
});

ipcMain.handle('getMangaMeta', (event, manga: Manga) => {
  return fetchManga(manga);
})

ipcMain.handle('getFavorites', (event) => {
  return getFavorites();
})

ipcMain.handle('favManga', (event, manga: Manga, doc?: MangaDocument) => {
  return toggleFavManga(manga, doc?._id);
})