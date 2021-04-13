const algoliasearch = require('algoliasearch')
const fs = require('fs');
const StreamArray = require('stream-json/streamers/StreamArray');
const path = require('path');


const APPID = 'CYZLQBTPSP';
const APIKEY = 'f36b16cad34d1bd8b78e63d11767cfaa';
const file = path.join(__dirname, "data/movieRecords.json");

const client = algoliasearch(APPID, APIKEY);
const index = client.initIndex('movies');


const stream = fs.createReadStream(file).pipe(StreamArray.withParser());
let chunks = [];

stream
  .on('data', ({ value }) => {
    chunks.push(value);
    if (chunks.length === 10000) {
      stream.pause();
      index
        .saveObjects(chunks, { autoGenerateObjectIDIfNotExist: true })
        .then(() => {
          chunks = [];
          stream.resume();
        })
        .catch(console.error);
    }
  })
  .on('end', () => {
    if (chunks.length) {
      index.saveObjects(chunks, { 
        autoGenerateObjectIDIfNotExist: true
      }).catch(console.error);
    }
  })
  .on('error', err => console.error(err));