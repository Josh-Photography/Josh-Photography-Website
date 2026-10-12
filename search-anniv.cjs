const https = require('https');

async function searchWiki(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=10&prop=imageinfo&iiprop=url`;
  return new Promise(resolve => {
    https.get(url, { headers: { 'User-Agent': 'FusedLensApp/1.0 (contact@fusedlens.test)' } }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(d);
          console.log('=== WIKI:', query, '===');
          if (json.query && json.query.pages) {
            Object.values(json.query.pages).forEach(p => {
              if (p.imageinfo && p.imageinfo[0]) {
                console.log(p.title, p.imageinfo[0].url);
              }
            });
          }
        } catch(e) { console.log(e.message); }
        resolve();
      });
    }).on('error', () => resolve());
  });
}

(async () => {
  await searchWiki('golden wedding anniversary couple');
  await searchWiki('senior couple anniversary');
})();
