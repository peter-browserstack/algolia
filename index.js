const algoliasearch = require("algoliasearch");

const APPLICATION_ID = 'CYZLQBTPSP';

const APIKEY = '51555379126e3b218566c5928482c797';

const INDEX ='T';

const client = algoliasearch(APPLICATION_ID,APIKEY);

const index = client.initIndex("T");






index
    .search("Doe")
    .then(({hits}) => {
        console.log(hits);
    })
    .catch(err => {
        console.log(err);
    })