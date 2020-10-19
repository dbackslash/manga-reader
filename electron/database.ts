import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-find'));

const db = new PouchDB<MangaDocument>('manga');

db.createIndex({
  index: {
    fields: ['site', 'id']
  }
})

export async function fetchManga(site: string, id: string) {
  const res = await db.find({
    selector: { site, id },
  })
  console.log('docs', res.docs);
  return res.docs[0];
}

export async function toggleFavManga(manga: Manga, docId?: string) {
  let doc = docId ? await db.get(docId) : null;

  if (doc) {
    await db.put({
      _id: doc._id,
      _rev: doc._rev,
      favorite: !doc.favorite,
      readed: doc.readed
    });
  } else {
    await db.put({
      favorite: true,
      readed: {},
    })
  }
}
