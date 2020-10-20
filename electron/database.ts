import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-find'));

const db = new PouchDB<MangaDocument>('manga', {
  prefix: './leveldb/',
});

db.createIndex({
  index: {
    fields: ['favorite', '_id']
  }
})

export async function fetchManga(manga: Manga) {
  return db.get(`${manga.site}:${manga.id}`).catch(() => null);
}

export async function getFavorites() {
  const res = await db.find({
    selector: { favorite: true },
    sort: ['_id']
  });

  return res.docs;
}

export async function toggleFavManga(manga: Manga, docId?: string) {
  let doc = docId ? await db.get(docId) : null;

  if (doc) {
    await db.put({
      _id: doc._id,
      _rev: doc._rev,
      manga: manga,
      favorite: !doc.favorite,
      readed: doc.readed
    });
  } else {
    await db.put({
      _id: `${manga.site}:${manga.id}`,
      manga,
      favorite: true,
      readed: {},
    });
  }
}
